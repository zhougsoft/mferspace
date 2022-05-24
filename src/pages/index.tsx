import React, { useState, useEffect } from 'react';
import Cookies from 'cookies';

import { useWeb3Context } from '../contexts/Web3Context';
import useAuth from '../hooks/useAuth';
import Layout from '../components/Layout';
import { Container } from '../components/Shared';
import TitleSection from '../components/TitleSection';

interface HomePageProps {
	hasAuthToken: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ hasAuthToken }) => {
	const { provider, activeAddress, connectWallet } = useWeb3Context();
	const [isLoading, setIsLoading] = useState<boolean>(false);


	// TODO: combine all this functionality and create AuthContext, replacing useAuth hook (need to track global auth state)
	const { login } = useAuth();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	useEffect(() => {
		if (hasAuthToken) {
			setIsAuthenticated(true)
		}
	}, [hasAuthToken])
	// --------------------------------------


	// Fetch auth cookie from backend
	const onAuthClick = async () => {
		if (!provider) {
			alert('connect wallet first!');
			return;
		}

		setIsLoading(true);

		await login(); // TODO: set isAuthenticated to true internally inside new conext after successful login
		
		setIsLoading(false);
	};

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<TitleSection />
				{isAuthenticated ? (
					<div>authenticated!</div>
				) : isLoading ? (
					<div>AUTHENTICATING...</div>
				) : !activeAddress ? (
					<button onClick={() => connectWallet()}>connect wallet</button>
				) : (
					<button onClick={onAuthClick}>authenticate</button>
				)}
			</Container>
		</Layout>
	);
};

// Check if authentication cookie exists from the server
export const getServerSideProps = async ({ req, res }: any) => {
	const cookies = new Cookies(req, res);
	const authToken = cookies.get('token');
	return { props: { hasAuthToken: authToken !== undefined } };
};

export default HomePage;
