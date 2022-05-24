import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'cookies';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { getMfer, getMferOwner } from '../../../services/mfer.service';
import { getProfile } from '../../../services/profile.service';
import { Mfer } from '../../../types';

import { Container } from '../../../components/Shared';
import Layout from '../../../components/Layout';

// TODO: put in types folder when ready
interface Profile {
	mfer_id: string;
	name: string;
	tagline: string;
	age: string;
	pronouns: string;
	location: string;
	link_1: string;
	link_2: string;
	link_3: string;
	last_updated: Date;
}

interface EditProfilePageProps {
	activeAddress?: string;
	mfer: Mfer;
	profile: Profile;
	error: boolean;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({
	mfer,
	profile,
	error,
}) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Profile>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: Profile) => {
		setIsLoading(true);

		data.mfer_id = mfer.id.toString();

		fetch(`/api/profile/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...data }),
		})
			.then(() => router.push(`/mfer/${mfer.id}`))
			.catch(error => {
				alert('error during request, check console!');
				console.error(error);
				setIsLoading(false);
			});
	};

	if (error) return <h1>server error - check server console</h1>;
	if (!mfer) return <h1>no mfer... server error! pls report</h1>;
	if (isLoading) return <h1>loading...</h1>;

	return (
		<Layout title={`edit ${mfer.name} | mferspace`}>
			<Container>
				<div>
					<h2>editing {mfer.name}&apos;s profile</h2>
					<Image src={mfer.img} alt={mfer.name} width="200px" height="200px" />
				</div>
				<Link href={`/mfer/${mfer.id}`}>
					<a>go back</a>
				</Link>
				{/* --- EDIT PROFILE FORM --- */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ marginTop: '2rem', fontSize: '0.9rem' }}
				>
					<h2>profile</h2>

					{/* NAME */}
					<div>
						<label htmlFor="name">name</label>
						<input
							defaultValue={profile?.name || ''}
							placeholder="name"
							{...register('name', { maxLength: 50 })}
							autoComplete="off"
						/>
						{errors.name && <span>max length 50 chars</span>}
					</div>

					{/* TAGLINE */}
					<div>
						<label htmlFor="tagline">tagline</label>
						<input
							defaultValue={profile?.tagline || ''}
							placeholder="tagline"
							{...register('tagline', { maxLength: 140 })}
							autoComplete="off"
						/>
						{errors.tagline && <span>max length 140 chars</span>}
					</div>

					{/* AGE */}
					<div>
						<label htmlFor="age">age</label>
						<input
							defaultValue={profile?.age || ''}
							placeholder="age"
							{...register('age', { maxLength: 25 })}
							autoComplete="off"
						/>
						{errors.age && <span>max length 25 chars</span>}
					</div>

					{/* PRONOUNS */}
					<div>
						<label htmlFor="pronouns">pronouns</label>
						<input
							defaultValue={profile?.pronouns || ''}
							placeholder="pronouns"
							{...register('pronouns', { maxLength: 50 })}
							autoComplete="off"
						/>
						{errors.pronouns && <span>max length 50 chars</span>}
					</div>

					{/* LOCATION */}
					<div>
						<label htmlFor="location">location</label>
						<input
							defaultValue={profile?.location || ''}
							placeholder="location"
							{...register('location', { maxLength: 100 })}
							autoComplete="off"
						/>
						{errors.location && <span>max length 100 chars</span>}
					</div>

					<hr />
					<h2>fav links</h2>

					{/* LINK 1 */}
					<div>
						<label htmlFor="link_1">link 1</label>
						<input
							defaultValue={profile?.link_1 || ''}
							placeholder="link one"
							{...register('link_1', { maxLength: 50 })}
							autoComplete="off"
						/>
						{errors.link_1 && <span>max length 50 chars</span>}
					</div>

					{/* LINK 2 */}
					<div>
						<label htmlFor="link_2">link 2</label>
						<input
							defaultValue={profile?.link_2 || ''}
							placeholder="link two"
							{...register('link_2', { maxLength: 50 })}
							autoComplete="off"
						/>
						{errors.link_2 && <span>max length 50 chars</span>}
					</div>

					{/* LINK 3 */}
					<div>
						<label htmlFor="link_3">link 3</label>
						<input
							defaultValue={profile?.link_3 || ''}
							placeholder="link three"
							{...register('link_3', { maxLength: 50 })}
							autoComplete="off"
						/>
						{errors.link_3 && <span>max length 50 chars</span>}
					</div>

					<br />
					{/* SUBMIT BUTTON */}
					<input type="submit" />
					<Link href={`/mfer/${mfer.id}`}>
						<a style={{ outline: '1px solid black', padding: '0.25rem 1rem' }}>
							cancel
						</a>
					</Link>
				</form>
				{/* --- END OF FORM --- */}
				<br />
				<br />
				<br />
				<br />
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ req, res, query: { id } }: any) => {
	try {
		// Get authentication cookies
		const cookies = new Cookies(req, res);
		const authToken = cookies.get('token');

		// If no existing auth, redirect to login page
		if (!authToken) {
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			};
		}

		// TODO: this is duped in '../mfer/[id].tsx'
		// Validate mfer id (mfer ids can range from 0 to 10020)
		const mferId = parseInt(id);
		if (isNaN(mferId) || mferId < 0 || mferId > 10020) {
			return {
				redirect: {
					permanent: false,
					destination: '/mfer/error',
				},
			};
		}

		// Validate auth token
		const { JWT_SECRET } = process.env;
		if (!JWT_SECRET) {
			throw new Error("No value set for 'process.env.JWT_SECRET'");
		}
		const decodedToken = jwt.verify(authToken, JWT_SECRET);
		if (typeof decodedToken === 'string') {
			throw new Error('Invalid JSON web token');
		}

		const {
			data: { address },
		} = decodedToken;

		// Check if user is the owner of requested mfer
		const mferOwner = await getMferOwner(mferId);
		const isOwner = address.toLowerCase() === mferOwner.toLowerCase();

		// If user doesn't own mfer, redirect to mfer profile page
		if (!isOwner) {
			return {
				redirect: {
					permanent: false,
					destination: `/mfer/${mferId.toString()}`,
				},
			};
		}

		// Fetch mfer data from chain, and profile data from DB
		const [mfer, profile] = await Promise.all([
			getMfer(mferId),
			getProfile(mferId),
		]);

		return { props: { mfer, profile, error: false } };
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			};
		} else {
			console.error(error);
			return { props: { error: true } };
		}
	}
};

export default EditProfilePage;
