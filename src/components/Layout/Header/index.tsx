import React from 'react';
import Link from 'next/link';

import * as S from './styled';

import { Container } from '../../Shared';

const Header: React.FC = () => {
	return (
		<S.HeaderWrapper>
			<Container>
				<Link href="/">
					<S.HomeLink>mferspace</S.HomeLink>
				</Link>
			</Container>
		</S.HeaderWrapper>
	);
};

export default Header;
