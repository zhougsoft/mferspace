import React from 'react';
import Link from 'next/link';

import { getMfer } from '../../services/mfer.service';
import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfilePicDisplay from '../../components/ProfilePicDisplay';
import AttributesDisplay from '../../components/AttributesDisplay';
import BlurbSection from '../../components/BlurbSection';

const MferPage: React.FC = ({ mfer, error }: any) => {
	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
			<Container>
				<Link href="/">
					<a>home, mfer...</a>
				</Link>
				<ProfilePicDisplay name={mfer.name} img={mfer.img} />
				<AttributesDisplay attributes={mfer.attributes} />
				<BlurbSection />
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		// validate param input
		// (mfer ids can range from 0 to 10020)
		const mferId = parseInt(id);
		if (mferId === NaN) {
			throw new Error('Invalid ID param - numbers only');
		}
		if (mferId < 0 || mferId > 10020) {
			throw new Error(
				'No mfers at requested ID - values between 0 - 10020 only'
			);
		}

		const mfer = await getMfer(id);
		return { props: { mfer, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default MferPage;
