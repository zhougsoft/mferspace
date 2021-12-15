import React from 'react';

import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';

const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
			<LandingPage />
		</Layout>
	);
};

export default HomePage;
