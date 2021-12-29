import React, { useEffect } from 'react';
import Link from 'next/link';

import { useAuthContext } from '../contexts/AuthContext';
import { truncateAddress } from '../utils';
import { Container } from '../components/Shared';
import Layout from '../components/Layout';
import { loadDefaultErrorComponents } from 'next/dist/server/load-components';

const HomePage: React.FC = () => {
	const { login } = useAuthContext();

	const handleConnectWallet = async () => {
		await login();
	};

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<br />

				<button onClick={handleConnectWallet}>login with wallet</button>

				<br />

				<small>check our yr profile:</small>
				<pre>mferspace.com/mfer/[mfer id]</pre>
				<Link href="/mfer/3191">example profile</Link>
			</Container>
		</Layout>
	);
};

export default HomePage;
