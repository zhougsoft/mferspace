import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useMfers, useWeb3 } from '../hooks';
import { truncateAddress } from '../utils';

import Layout from '../components/Layout';
import { Container, ExtLink } from '../components/Shared';

const HomePage: React.FC = () => {
	const { provider, account } = useWeb3();
	const { getMfersByAddress } = useMfers(provider);
	const [mferIds, setMferIds] = useState<number[]>([]);

	// Fetch owned mfers when wallet connects
	useEffect(() => {
		if (account) {
			getMfersByAddress(account).then(tokenIds => {
				setMferIds(tokenIds);
			});
		}
	}, [account]);

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<small>
					<em>
						mferspace is a work in progress by{' '}
						<ExtLink href="https://twitter.com/zhoug0x">zhoug</ExtLink>
					</em>
				</small>
				<hr />
				{account ? (
					<>
						<button
							style={{ marginBottom: '1rem' }}
							onClick={() => alert('TODO: disconnect wallet')}
						>
							disconnect
						</button>
						<div>connected: {truncateAddress(account)}</div>

						{mferIds.length > 0 ? (
							<>
								<div>mfer hodler detected!</div>
								<ol>
									{mferIds.map(id => (
										<li key={'mfer-' + id}>
											<Link href={`/mfer/${id}`}>
												<a>{`mfer #${id}`}</a>
											</Link>
										</li>
									))}
								</ol>
							</>
						) : (
							<div>no mfers detected in wallet...</div>
						)}
					</>
				) : (
					<button onClick={() => alert('TODO: connect wallet')}>connect wallet</button>
				)}
			</Container>
		</Layout>
	);
};

export default HomePage;
