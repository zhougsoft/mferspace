import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getMfer } from '../../../services/mfer.service';
import { getProfile } from '../../../services/profile.service';

import { Container } from '../../../components/Shared';
import Layout from '../../../components/Layout';

const EditField: React.FC<any> = ({ name, value, label, onChange }) => (
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
			placeholder={label}
			onChange={onChange}
		/>
	</div>
);

const MferPage: React.FC = ({ mfer, profile, error }: any) => {
	const [taglineInput, setTaglineInput] = useState<string>(profile?.tagline);
	const [pronounsInput, setPronounsInput] = useState<string>(profile?.pronouns);
	const [ageInput, setAgeInput] = useState<string>(profile?.age);
	const [locationInput, setLocationInput] = useState<string>(profile?.location);

	const onTaglineChange = (e: any) => setTaglineInput(e.target.value);
	const onPronounsChange = (e: any) => setPronounsInput(e.target.value);
	const onAgeChange = (e: any) => setAgeInput(e.target.value);
	const onLocationChange = (e: any) => setLocationInput(e.target.value);

	const onSaveClick = () => {
        
		// TODO:

		console.log('save clicked!', {
			taglineInput,
			pronounsInput,
			ageInput,
			locationInput,
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
					<EditField
						name="tagline"
						value={taglineInput}
						label="tagline"
						onChange={onTaglineChange}
					/>
					<EditField
						name="pronouns"
						value={pronounsInput}
						label="pronouns"
						onChange={onPronounsChange}
					/>
					<EditField
						name="age"
						value={ageInput}
						label="age"
						onChange={onAgeChange}
					/>
					<EditField
						name="location"
						value={locationInput}
						label="location"
						onChange={onLocationChange}
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

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		// param input validation
		// (mfer ids can range from 0 to 10020)
		const mferId = parseInt(id);
		if (mferId === NaN) {
			throw Error('Invalid ID param - numbers only');
		}
		if (mferId < 0 || mferId > 10020) {
			throw Error('No mfers at requested ID - values between 0 - 10020 only');
		}

		// TODO: wrap in 'await Promise.all()'
		const mfer = await getMfer(mferId);
		const profile = await getProfile(mferId);
		return { props: { mfer, profile, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default MferPage;
