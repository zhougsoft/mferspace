import React from 'react';
import { parseAuthCookie } from '../services/auth.service';
import Layout from '../components/Layout';
import LandingPage from '../components/LandingPage';

interface HomePageProps {
	loggedInAddress?: string;
}

const HomePage: React.FC<HomePageProps> = ({ loggedInAddress }) => {
	return (
		<Layout
			title="mferspace | a space for mfers"
			loggedInAddress={loggedInAddress}
		>
			<LandingPage />
		</Layout>
	);
};

// Check auth cookie server side and return authenticated address if logged in
export const getServerSideProps = async ({ req, res }: any) => {
	const loggedInAddress = parseAuthCookie(req, res);
	return { props: loggedInAddress ? { loggedInAddress } : {} };
};

export default HomePage;
