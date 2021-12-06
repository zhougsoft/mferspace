import React from 'react';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = ({ msg1, msg2 }: any) => {
	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1>🙂 mferspace</h1>
				<h3>a space for mfers</h3>
				<hr />
				<p>
					{msg1} {msg2}
				</p>
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	try {
		const props = {
			msg1: 'boilerplate',
			msg2: 'ready...',
		};
		return { props };
	} catch (error) {
		console.error(error);
	}
};

export default HomePage;
