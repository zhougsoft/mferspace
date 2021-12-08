import React from 'react';
import Link from 'next/link';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1>mferspace</h1>
				<h3>a space for mfers</h3>
				<Link href="/mfer/123">
					<a>test mfer</a>
				</Link>
			</Container>
		</Layout>
	);
};

export default HomePage;
