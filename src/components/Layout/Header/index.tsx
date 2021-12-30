import React from 'react';
import Link from 'next/link';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as S from './styled';
import { Container } from '../../Shared';

const Header: React.FC = () => {
	const { login, logout } = useAuthContext();

	const handleLogin = async () => {
		await login();
	};
	const handleLogout = async () => {
		await logout();
	};

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
					<Link href="/">
						<S.HomeLink>mferspace</S.HomeLink>
					</Link>
					<div style={{ fontSize: '0.9rem' }}>
						<button onClick={handleLogin}>login with wallet</button>
						<button onClick={handleLogout}>logout</button>
					</div>
				</div>
			</Container>
		</S.HeaderWrapper>
	);
};

export default Header;
