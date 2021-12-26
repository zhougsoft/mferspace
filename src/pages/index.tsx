import React, { useEffect } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

// so TypeScript allows `window.ethereum`
declare const window: any;

const MSG_TO_SIGN = 'hello world';

const HomePage: React.FC = () => {
	// DO STUFF ON LOAD
	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			(async () => {
				// sign a string
				const rawSignature = await signer.signMessage(MSG_TO_SIGN);
				const address = await signer.getAddress();

				// do something with the signed string?
				await fetch('/api/auth', {
					method: 'POST',
					body: JSON.stringify({
						address,
						signature: rawSignature,
						secretMsg: MSG_TO_SIGN,
					}),
				});
			})();
		}
	}, []);

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<br />
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
