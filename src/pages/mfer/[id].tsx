import React from 'react';
import Link from 'next/link';

import { useMfers } from '../../hooks';
import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileShowcase from '../../components/ProfileShowcase';

const MferPage: React.FC = ({ mfer, error }: any) => {
	console.log(mfer);

	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
			<Container>
				<Link href="/">
					<a>home, mfer...</a>
				</Link>
				<ProfileShowcase name={mfer.name} img={mfer.img} />
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		// validate param input
		// (mfer ids range between 0 to 10020)
		const mferId = parseInt(id);
		if (mferId === NaN) {
			throw new Error('Invalid ID param - numbers only');
		}
		if (mferId < 0 || mferId > 10020) {
			throw new Error(
				'No mfers at requested ID - values between 0 - 10020 only'
			);
		}

		// fetch & pass mfer data to component
		const { getMfer } = useMfers();
		const mfer = await getMfer(id);
		return { props: { mfer, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default MferPage;
