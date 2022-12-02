import React from 'react';
import Layout from '../components/Layout';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
	0% { transform: translateY(0); }
	50% { transform: translateY(0.5rem); }
	100% { transform: translateY(0); }
`;

const Eyes = styled.div`
	font-size: 10rem;
	animation: ${float} 0.5s ease-in-out;
	animation-iteration-count: infinite;
`;

const HomePage: React.FC = () => {
	return (
		<Layout title="mferspace | a space for mfers">
			<Eyes>👀</Eyes>
		</Layout>
	);
};

export default HomePage;
