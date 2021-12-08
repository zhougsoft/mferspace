import React from 'react';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = ({ mfer, error }: any) => {
	console.log(mfer);

	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1>mferspace</h1>
				<h3>a place for mfers</h3>
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	try {
		return { props: {} };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default HomePage;
