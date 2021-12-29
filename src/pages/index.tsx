import React, { useEffect } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

// so TypeScript allows `window.ethereum`
declare const window: any;

// Authenticates w/ DB & gets JWT token in http-only cookie
const loginUser = async () => {
	if (window.ethereum) {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		// Fetch user nonce from DB
		const address = await signer.getAddress();
		const nonceResult = await fetch('/api/auth/nonce', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address }),
		}).then(res => res.json());

		// sign fetched nonce with wallet
		const signature = await signer.signMessage(nonceResult.nonce.toString());

		// send signature to server for verification
		const authResult = await fetch('/api/auth/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ address, signature }),
		}).then(res => res.json());

		return authResult;
	}
};

const HomePage: React.FC = () => {
	
	const handleConnectWallet = async () => {
		const result = await loginUser();
		console.log(result);
	};

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<br />
				<button onClick={handleConnectWallet}>connect wallet!</button>
				<br />
				<p>check out a mfer profile! </p>
				<small>go to:</small>
				<pre>mferspace.com/mfer/[mfer id]</pre>
				<Link href="/mfer/3191">example profile</Link>
			</Container>
		</Layout>
	);
};

export default HomePage;
