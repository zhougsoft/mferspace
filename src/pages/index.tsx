import React from 'react';
import Link from 'next/link';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
				<h3>a space for mfers</h3>
				<br />
				<br />
				<small>check our yr profile:</small>
				<pre>mferspace.com/mfer/[mfer id]</pre>
				<Link href="/mfer/3191">example profile</Link>
			</Container>
		</Layout>
	);
};

export default HomePage;
