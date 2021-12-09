import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
	h5 {
		color: #fb7515;
	}
`;

const BlurbSection: React.FC<{ name: string }> = ({ name = 'mfer' }) => {
	return (
		<Section>
			<h5>{name}&apos;s Blurbs</h5>

			<h5>About me:</h5>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde quas
				voluptates nesciunt officiis eveniet earum qui asperiores fuga
				blanditiis molestias?
			</p>

			<h5>Who I&apos;d like to meet:</h5>
			<p>Lorem ipsum dolor sit amet consectetur adipisicinga elit!</p>
		</Section>
	);
};

export default BlurbSection;
