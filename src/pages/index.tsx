import React, { useState } from 'react';

import { useWeb3Context } from '../contexts/Web3Context';
import { useAuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Container } from '../components/Shared';
import TitleSection from '../components/TitleSection';

interface HomePageProps {
	hasAuthToken: boolean;
}

const HomePage: React.FC<HomePageProps> = () => {
	const { isAuthenticated, login } = useAuthContext();
	const { provider, activeAddress, connectWallet } = useWeb3Context();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Fetch auth cookie from backend
	const onAuthClick = async () => {
		if (!provider) {
			alert('connect wallet first!');
			return;
		}

		setIsLoading(true);
		const signer = await provider.getSigner();
		await login(signer);
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

export default HomePage;
