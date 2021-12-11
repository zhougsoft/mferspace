import React from 'react';

import * as S from './styled';
import { IconEmoji } from '../Shared';

const BlurbSection: React.FC<{ name: string }> = ({ name = 'this mfer' }) => {
	return (
		<S.Section>
			<div className="update-msg">
				<IconEmoji alt="Hand pointing down">👇</IconEmoji> also editable in
				future updates!
			</div>
			<S.Article>
				<h5>About {name}</h5>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde quas
					voluptates nesciunt officiis eveniet earum qui asperiores fuga
					blanditiis!
				</p>
				<h5>Who {name} would like to meet</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicinga elit!</p>
			</S.Article>
		</S.Section>
	);
};

export default BlurbSection;
