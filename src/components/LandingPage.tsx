import React from 'react';
import Link from 'next/link';

import { Container, ExtLink, GithubIcon } from '../components/Shared';

const LandingPage: React.FC = () => {
	return (
		<Container>
			<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<h3 style={{ marginRight: '0.75rem' }}>a space for mfers</h3>

				<ExtLink href="https://github.com/zhoug0x/mferspace">
					<GithubIcon />
				</ExtLink>
			</div>

			<div
				style={{
					width: 'fit-content',
					outline: '1px solid lightblue',
					padding: '1rem',
					fontStyle: 'italic',
					fontFamily: 'serif',
					margin: '2rem 0 3rem 0',
				}}
			>
				<p style={{ marginTop: '0' }}>
					<strong>gm,</strong>
					<br />
					<br />
					mferspace is a work-in-progress by{' '}
					<ExtLink href="https://twitter.com/zhoug0x">zhoug</ExtLink> and the{' '}
					<ExtLink href="https://discord.gg/gkBDxcPx">
						mfers discord mfers
					</ExtLink>
				</p>

				<small>
					interested in getting a mfer for yrself? grab one{' '}
					<ExtLink href="https://opensea.io/collection/mfers">
						here on opensea
					</ExtLink>
				</small>
			</div>

			<h4>check out yr mfin profile!</h4>
			<pre>mferspace.com/mfer/[yr mfer id]</pre>
			<Link href="/mfer/3191">some example mfer</Link>
			<br />
			<br />
		</Container>
	);
};

export default LandingPage;
