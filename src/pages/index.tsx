import React, { useState, useEffect } from 'react';

import { useWeb3, useAuth } from '../hooks';
import { truncateAddress } from '../utils';

import Layout from '../components/Layout';
import { Container } from '../components/Shared';

// TODO: put in hook with mfer fetching stuff
import { ethers, Contract, BigNumber } from 'ethers';
import { MFER_CONTRACT_ADDRESS } from '../config/constants';
import abi from '../config/abi/mfers.json';

const HomePage: React.FC = () => {
	const {
		provider,
		isActive,
		account,
		useSigner,
		connectWallet,
		disconnectWallet,
	} = useWeb3();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);







	
	// TODO: stash mfer fetching functions in a hook
	useEffect(() => {
		if (isActive && account) {
			console.log('account active: ', account);
			const mfersContract: Contract = new ethers.Contract(
				MFER_CONTRACT_ADDRESS,
				abi,
				provider
			);

			mfersContract.balanceOf(account).then((bal: BigNumber) => {
				console.log('mfers owned:', bal.toNumber());
			});
		}
	}, [account]);








	// Fetch auth cookie from backend on login click
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
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<hr />
				{isActive && account ? (
					<>
						<div>connected: {truncateAddress(account)}</div>
						<button onClick={() => disconnectWallet()}>disconnect</button>

						<div>user's mfers go here</div>

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
