import React, { useState } from 'react';

import { useWeb3, useAuth } from '../hooks';
import { truncateAddress } from '../utils';

import Layout from '../components/Layout';
import { Container } from '../components/Shared';
import TitleSection from '../components/TitleSection';

const HomePage: React.FC = () => {
	const { isActive, account, connectWallet, useSigner } = useWeb3();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Fetch auth cookie from backend
	const onLoginClick = async () => {
		if (!isActive) {
			alert('connect wallet first!');
			return;
		}

		setIsLoading(true);
		await login(useSigner());
		setIsLoading(false);
	};

	if (isLoading) return <h1>busy</h1>;

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<TitleSection />
				{isActive && account ? (
					<>
						<div>connected: {truncateAddress(account)}</div>
						<br />
						<br />
						<button onClick={onLoginClick}>verify wallet</button>
						<br />
						<br />
						<div>
							each time u sign with this <em>verify wallet</em> button, u will
							fetch an auth cookie from server with a 1hr expiry
						</div>
					</>
				) : (
					<button onClick={() => connectWallet()}>connect wallet</button>
				)}
			</Container>
		</Layout>
	);
};

export default HomePage;
