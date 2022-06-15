import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useAuth, useMfers, useWeb3 } from '../hooks';
import { truncateAddress } from '../utils';

import Layout from '../components/Layout';
import { Container } from '../components/Shared';

const HomePage: React.FC = () => {
	const {
		provider,
		isActive,
		account,
		getSigner,
		connectWallet,
		disconnectWallet,
	} = useWeb3();
	const { getMfersByAddress } = useMfers(provider);
	const { login } = useAuth();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [mferIds, setMferIds] = useState<number[]>([]);

	// Fetch owned mfers when wallet connects
	useEffect(() => {
		if (isActive && account) {
			getMfersByAddress(account).then(tokenIds => {
				setMferIds(tokenIds);
			});
		}
	}, [isActive, account]);

	// Fetch auth cookie from backend on login click
	const onLoginClick = async () => {
		if (!isActive) {
			alert('connect wallet first!');
			return;
		}

		setIsLoading(true);
		await login(getSigner());
		setIsLoading(false);
	};

	if (isLoading) return <h1>busy</h1>;

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<hr />
				{isActive && account ? (
					<>
						<div>connected: {truncateAddress(account)}</div>
						<button onClick={() => disconnectWallet()}>disconnect</button>

						{mferIds.length > 0 ? (
							<>
								<div>mfer hodler!</div>
								<ol>
									{mferIds.map(id => (
										<li key={'mfer-' + id}>
											<Link href={`/mfer/${id}`}>
												<a>{id}</a>
											</Link>
										</li>
									))}
								</ol>
							</>
						) : (
							<div>no mfers...</div>
						)}

						<hr />
						<div>
							<button onClick={onLoginClick}>verify wallet</button>
							<div>
								each time u sign with this <em>verify wallet</em> button, u will
								fetch an auth cookie from server with a 1hr expiry
							</div>
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
