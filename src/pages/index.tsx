import React from 'react';
import styled from 'styled-components';
import { Container, ExtLink } from '../components/Shared';
import Layout from '../components/Layout';




export const Heading = styled.div`
	& > h1 {
		font-size: 3rem;
		margin-bottom: 0;
	}

	& > div {
		display: flex;
		align-items: center;

		& h3 {
			margin-right: 0.75rem;
		}
	}
`;


const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
					<Container>
			<Heading>
				<h1>mferspace</h1>
				<div>
					<h3>a place for mfers</h3>
				</div>
			</Heading>
		</Container>
		</Layout>
	);
};

export default HomePage;
