import React from 'react';
import Link from 'next/link';

import { parseAuthCookie } from '../services/auth.service';
import { Container } from '../components/Shared';
import Layout from '../components/Layout';

interface HomePageProps {
	loggedInAddress?: string;
}

const HomePage: React.FC<HomePageProps> = ({ loggedInAddress }) => {
	return (
		<Layout
			title="mferspace | a space for mfers"
			loggedInAddress={loggedInAddress}
		>
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<small>
					<Link href="/login">
						<a>
							<b>login</b> with wallet
						</a>
					</Link>
				</small>
				<br />
				<hr />
				<br />
				<small>check our yr profile:</small>
				<pre>mferspace.com/mfer/[mfer id]</pre>
				<small>
					<Link href="/mfer/3191">
						<a>example profile</a>
					</Link>
				</small>
			</Container>
		</Layout>
	);
};

// Check auth cookie server side and return authenticated address if logged in
export const getServerSideProps = async ({ req, res }: any) => {
	const loggedInAddress = parseAuthCookie(req, res);
	return { props: loggedInAddress ? { loggedInAddress } : {} };
};

export default HomePage;
