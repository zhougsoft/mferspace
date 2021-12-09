import React from 'react';
import styled from 'styled-components';

import { IconEmoji } from './Shared';

const Section = styled.section`
	.blurb-heading {
		color: #fb7515;
		margin: 0;
	}
`;

const BlurbSection: React.FC<{ name: string }> = ({ name = 'this mfer' }) => {
	return (
		<Section>
			<div
				style={{
					fontSize: '0.75rem',
					marginTop: '1.5rem',
					marginBottom: '1rem',
				}}
			>
				<IconEmoji alt="Hand pointing down">👇</IconEmoji> also editable in
				future updates!
			</div>
			<article>
				<h5 className="blurb-heading">About {name}</h5>
				<p style={{ fontSize: '0.8rem' }}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde quas
					voluptates nesciunt officiis eveniet earum qui asperiores fuga
					blanditiis!
				</p>

				<h5 className="blurb-heading">Who {name} would like to meet</h5>
				<p style={{ fontSize: '0.8rem' }}>
					Lorem ipsum dolor sit amet consectetur adipisicinga elit!
				</p>
			</article>
		</Section>
	);
};

export default BlurbSection;
