import React from 'react';

import * as S from './styled';

interface BioSectionProps {
	name: string;
	bioOne: string;
	bioTwo: string;
}

const BioSection: React.FC<BioSectionProps> = ({
	name = 'this mfer',
	bioOne = '...',
	bioTwo = '...',
}) => {
	return (
		<S.Section>
			<S.Article>
				<h5>About {name}</h5>
				<p>{bioOne.length === 0 ? '...' : bioOne}</p>
			</S.Article>
			<S.Article>
				<h5>Who {name} would like to meet</h5>
				<p>{bioTwo.length === 0 ? '...' : bioTwo}</p>
			</S.Article>
		</S.Section>
	);
};

export default BioSection;
