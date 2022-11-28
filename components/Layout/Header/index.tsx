import React from 'react';
import Link from 'next/link';

// import { useWeb3 } from '../../../hooks';
import { truncateAddress } from '../../../utils';
import * as S from './styled';
import { Container } from '../../Shared';

const Header: React.FC = () => {

	// TODO:
	let isActive, account
	// const { isActive, account, connectWallet } = useWeb3();


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
						{isActive && account ? (
							<div style={{ color: 'white' }}>
								<small>connected: {truncateAddress(account)}</small>
							</div>
						) : (
							<button
								onClick={() => alert('TODO: connect wallet')}
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
