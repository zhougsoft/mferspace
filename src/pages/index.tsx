import React from 'react';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1>mferspace</h1>
				<h3>a space for mfers</h3>
			</Container>
		</Layout>
	);
};

export default HomePage;
