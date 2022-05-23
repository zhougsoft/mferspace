import React from 'react';
import { parseAuthCookie } from '../services/auth.service';
import Layout from '../components/Layout';
import TitleSection from '../components/TitleSection';

interface HomePageProps {
	activeAddress?: string;
}

const HomePage: React.FC<HomePageProps> = ({ activeAddress }) => {
	return (
		<Layout title="mferspace | a space for mfers" activeAddress={activeAddress}>
			<TitleSection />
		</Layout>
	);
};

// Check auth cookie server side and return authenticated address if logged in
export const getServerSideProps = async ({ req, res }: any) => {
	const activeAddress = parseAuthCookie(req, res);
	return { props: activeAddress ? { activeAddress } : {} };
};

export default HomePage;
