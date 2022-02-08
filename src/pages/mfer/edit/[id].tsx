import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'cookies';

import { getMfer } from '../../../services/mfer.service';
import { getProfile } from '../../../services/profile.service';

import { Container } from '../../../components/Shared';
import Layout from '../../../components/Layout';

const EditField: React.FC<any> = ({
	name,
	value,
	label,
	placeholder,
	onChange,
}) => (
	<div>
		<label
			style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}
			htmlFor={name}
		>
			{label}:
		</label>

		<input
			type="text"
			style={{ marginBottom: '1rem' }}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	</div>
);

const EditProfilePage: React.FC = ({ mfer, profile, error }: any) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [taglineInput, setTaglineInput] = useState<string>(
		profile?.tagline || ''
	);
	const [pronounsInput, setPronounsInput] = useState<string>(
		profile?.pronouns || ''
	);
	const [ageInput, setAgeInput] = useState<string>(profile?.age || '');
	const [locationInput, setLocationInput] = useState<string>(
		profile?.location || ''
	);
	const [link1Input, setLink1Input] = useState<string>(profile?.link_1 || '');
	const [link2Input, setLink2Input] = useState<string>(profile?.link_2 || '');
	const [link3Input, setLink3Input] = useState<string>(profile?.link_3 || '');

	// form input handler
	const onTaglineChange = (e: any) => setTaglineInput(e.target.value);
	const onPronounsChange = (e: any) => setPronounsInput(e.target.value);
	const onAgeChange = (e: any) => setAgeInput(e.target.value);
	const onLocationChange = (e: any) => setLocationInput(e.target.value);
	const onLink1Change = (e: any) => setLink1Input(e.target.value);
	const onLink2Change = (e: any) => setLink2Input(e.target.value);
	const onLink3Change = (e: any) => setLink3Input(e.target.value);

	const onSaveClick = () => {
		setIsLoading(true);

		// *~*~*~* TODO *~*~*~*

		// TODO: INPUT VALIDATION
		// tagline - 140 chars
		// pronouns - 50 chars
		// age - 50 chars
		// location - 100 chars
		// link_1 - 50 chars
		// link_2 - 50 chars
		// link_3 - 50 chars

		// CHECK IF JWT STILL VALID
		// if false, prompt wallet sign/login

		// *~*~*~*~*~*~*~*~*~*

		fetch(`/api/profile/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mfer_id: mfer.id,
				tagline: taglineInput,
				pronouns: pronounsInput,
				age: ageInput,
				location: locationInput,
				link_1: link1Input,
				link_2: link2Input,
				link_3: link3Input,
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
		<Layout title={`edit ${mfer.name} | mferspace`}>
			<Container>
				<div>
					<h2>editing {mfer.name}&apos;s profile</h2>
					<Image src={mfer.img} alt={mfer.name} width="200px" height="200px" />
				</div>
				<Link href={`/mfer/${mfer.id}`}>
					<a>go back</a>
				</Link>
				<div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
					<h2>profile</h2>
					<EditField
						name="tagline"
						value={taglineInput}
						label="tagline"
						onChange={onTaglineChange}
						placeholder="~*~ sO RanDom!!1 ~*~"
					/>
					<EditField
						name="pronouns"
						value={pronounsInput}
						label="pronouns"
						onChange={onPronounsChange}
						placeholder="him/her/just 4 fun"
					/>
					<EditField
						name="age"
						value={ageInput}
						label="age"
						onChange={onAgeChange}
						placeholder="lol nope"
					/>
					<EditField
						name="location"
						value={locationInput}
						label="location"
						onChange={onLocationChange}
						placeholder="2006"
					/>
					<hr />
					<h2>fav links</h2>
					<EditField
						name="link1"
						value={link1Input}
						label="link1"
						onChange={onLink1Change}
						placeholder="friendster.com"
					/>
					<EditField
						name="link2"
						value={link2Input}
						label="link2"
						onChange={onLink2Change}
						placeholder="livejournal.com"
					/>
					<EditField
						name="link3"
						value={link3Input}
						label="link3"
						onChange={onLink3Change}
						placeholder="xanga.com"
					/>
					<br />
					<button
						style={{ cursor: 'pointer', padding: '0.5rem 1.25rem' }}
						onClick={onSaveClick}
					>
						save
					</button>
					<br />
				</div>
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ req, res, query }: any) => {
	// Get authentication cookies
	const cookies = new Cookies(req, res);
	const addressCookie = cookies.get('address');
	const tokenCookie = cookies.get('token');

	// If no existing auth, redirect to login page
	if (!addressCookie || !tokenCookie) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}

	try {
		// param input validation
		// (mfer ids can range from 0 to 10020)
		const mferId = parseInt(query.id);
		if (mferId === NaN) {
			throw Error('Invalid ID param - numbers only');
		}
		if (mferId < 0 || mferId > 10020) {
			throw Error('No mfers at requested ID - values between 0 - 10020 only');
		}



		// console.log('address cookie\n', addressCookie, '\n');
		// console.log('token cookie (http-only)\n', tokenCookie, '\n');

		console.log('###\n\nHELLO!!!!\n\n###');
		

		// *~*~*~* TODO *~*~*~*

		// VALIDATE JWT ISNT EXPIRED

		// then...

		// VALIDATE TOKEN OWNER

		// does address own the mfer ID being edited?

		// if true, continue

		// else, display error

		// *~*~*~*~*~*~*~*~*~*




		// TODO: wrap in 'await Promise.all()'
		const mfer = await getMfer(mferId);
		const profile = await getProfile(mferId);
		return { props: { mfer, profile, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default EditProfilePage;
