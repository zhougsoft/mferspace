import React from 'react';

import * as S from './styled';

const BlurbSection: React.FC<{ name: string }> = ({ name = 'this mfer' }) => {
	return (
		<S.Section>
			<S.Article>
				<h5>About {name}</h5>
				<p>coming soon...</p>
			</S.Article>
			<S.Article>
				<h5>Who {name} would like to meet</h5>
				<p>coming soon...</p>
			</S.Article>
		</S.Section>
	);
};

export default BlurbSection;
