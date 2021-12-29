import React, { useEffect } from 'react';
import Link from 'next/link';

import { useAuthContext } from '../contexts/AuthContext';
import { truncateAddress } from '../utils';
import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
	const { address, login, logout } = useAuthContext();

	// TODO: del me, being used as dev helper
	useEffect(() => {
		console.log('address', address);
	}, [address]);

	const handleConnectWallet = () => {
		login().then(() => {
			console.log('logged in!');
		});
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<br />

				{address ? (
					<button onClick={handleLogout}>logout</button>
				) : (
					<button onClick={handleConnectWallet}>login with wallet</button>
				)}

				{address && (
					<small>
						<br />
						<br />
						connected!
						<br />
						{truncateAddress(address)}
						<br />
					</small>
				)}
				<br />

				<small>check our yr profile:</small>
				<pre>mferspace.com/mfer/[mfer id]</pre>
				<Link href="/mfer/3191">example profile</Link>
			</Container>
		</Layout>
	);
};

export default HomePage;
