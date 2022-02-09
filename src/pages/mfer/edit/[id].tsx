import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'cookies';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { getMfer, getMferOwner } from '../../../services/mfer.service';
import { getProfile } from '../../../services/profile.service';

import { Container } from '../../../components/Shared';
import Layout from '../../../components/Layout';

const EditProfilePage: React.FC = ({
	loggedInAddress,
	mfer,
	profile,
	error,
}: any) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();









	// TODO: library not detected validation errors???????
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			console.warn('form validation errors detected!', errors);
		}
	}, [errors]);










	// TODO: type the form submit data
	const onSubmit = (data: any) => {
		console.log({ data });
		return;

		setIsLoading(true);

		fetch(`/api/profile/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mfer_id: mfer.id,
				name: '',
				tagline: 'taglineInput',
				pronouns: '',
				age: '',
				location: '',
				link_1: '',
				link_2: '',
				link_3: '',
			}),
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

	return (
		<Layout
			title={`edit ${mfer.name} | mferspace`}
			loggedInAddress={loggedInAddress}
		>
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
							{...register('name', { max: 50 })}
							autoComplete="off"
						/>
						{errors.name && <span>invalid input</span>}
					</div>

					{/* TAGLINE */}
					<div>
						<label htmlFor="tagline">tagline</label>
						<input
							defaultValue={profile?.tagline || ''}
							{...register('tagline', { max: 140 })}
							autoComplete="off"
						/>
						{errors.tagline && <span>invalid input</span>}
					</div>

					{/* PRONOUNS */}
					<div>
						<label htmlFor="pronouns">pronouns</label>
						<input
							defaultValue={profile?.pronouns || ''}
							{...register('pronouns', { max: 50 })}
							autoComplete="off"
						/>
						{errors.pronouns && <span>invalid input</span>}
					</div>

					{/* AGE */}
					<div>
						<label htmlFor="age">age</label>
						<input
							defaultValue={profile?.age || ''}
							{...register('age', { max: 25 })}
							autoComplete="off"
						/>
						{errors.age && <span>invalid input</span>}
					</div>

					{/* LOCATION */}
					<div>
						<label htmlFor="location">location</label>
						<input
							defaultValue={profile?.location || ''}
							{...register('location', { max: 100 })}
							autoComplete="off"
						/>
						{errors.location && <span>invalid input</span>}
					</div>

					<hr />
					<h2>fav links</h2>

					{/* LINK 1 */}
					<div>
						<label htmlFor="link1">link 1</label>
						<input
							defaultValue={profile?.link_1 || ''}
							{...register('link1', { max: 50 })}
							autoComplete="off"
						/>
						{errors.link1 && <span>invalid input</span>}
					</div>

					{/* LINK 2 */}
					<div>
						<label htmlFor="link2">link 2</label>
						<input
							defaultValue={profile?.link_2 || ''}
							{...register('link2', { max: 50 })}
							autoComplete="off"
						/>
						{errors.link2 && <span>invalid input</span>}
					</div>

					{/* LINK 3 */}
					<div>
						<label htmlFor="link3">link 3</label>
						<input
							defaultValue={profile?.link_3 || ''}
							{...register('link3', { max: 50 })}
							autoComplete="off"
						/>
						{errors.link3 && <span>invalid input</span>}
					</div>

					{/* SUBMIT BUTTON */}
					<input type="submit" />
					<br />
				</form>
				{/* --- END OF FORM --- */}
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ req, res, query }: any) => {
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

		// Validate input ID (mfer ids can range from 0 to 10020)
		const mferId = parseInt(query.id);
		if (mferId === NaN) {
			throw Error('Invalid ID param - numbers only');
		}
		if (mferId < 0 || mferId > 10020) {
			throw Error('No mfers at requested ID - values between 0 - 10020 only');
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

		return { props: { loggedInAddress: address, mfer, profile, error: false } };
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
