import React from 'react';
import Link from 'next/link';

import { truncateAddress } from '../../../utils';
import * as S from './styled';
import { Container } from '../../Shared';

interface HeaderProps {
	loggedInAddress?: string;
}

const Header: React.FC<HeaderProps> = ({ loggedInAddress }) => {
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
						{loggedInAddress ? (
							<div style={{ display: 'flex', color: '#FFF' }}>
								<div style={{ marginRight: '0.5rem' }}>
									<small>logged in: </small>
									<b>{truncateAddress(loggedInAddress)}</b>
								</div>
								<div>&nbsp;|&nbsp;&nbsp;</div>
								<Link href="/logout">
									<a style={{ color: 'white' }}>logout</a>
								</Link>
							</div>
						) : (
							<Link href="/login">
								<a style={{ color: 'white' }}>login with wallet</a>
							</Link>
						)}
					</div>
				</div>
			</Container>
		</S.HeaderWrapper>
	);
};

export default Header;
