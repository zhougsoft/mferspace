import React from 'react';
import Link from 'next/link';

import * as S from './styled';
import { Container } from '../../Shared';

const Header: React.FC = () => {
	return (
		<S.HeaderWrapper>
			<Container>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Link href="/" passHref>
						<S.HomeLink>mferspace</S.HomeLink>
					</Link>
					<div style={{ fontSize: '0.9rem' }}>
						<button disabled>
							connect wallet <small>(in dev)</small>
						</button>
					</div>
				</div>
			</Container>
		</S.HeaderWrapper>
	);
};

export default Header;
