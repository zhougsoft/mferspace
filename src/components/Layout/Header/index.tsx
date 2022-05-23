import React from 'react';
import Link from 'next/link';

import { useWeb3Context } from '../../../contexts/Web3Context';
import { truncateAddress } from '../../../utils';
import * as S from './styled';
import { Container } from '../../Shared';

const Header: React.FC = () => {
	const { connectWallet, activeAddress } = useWeb3Context();

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
						{activeAddress ? (
							<div style={{ color: 'white' }}>
								<small>connected: </small>
								<b>{truncateAddress(activeAddress)}</b>
							</div>
						) : (
							<button
								onClick={() => connectWallet()}
								style={{
									cursor: 'pointer',
									fontWeight: 'bold',
								}}
							>
								connect wallet
							</button>
						)}
					</div>
				</div>
			</Container>
		</S.HeaderWrapper>
	);
};

export default Header;
