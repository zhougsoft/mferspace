import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { useAuthContext } from '../contexts/AuthContext';
import { truncateAddress } from '../utils';
import { Container } from '../components/Shared';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
	const { login, logout } = useAuthContext();
	const [loggedInAddress, setLoggedInAddress] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Check the address cookie to see if already user already authenticated
	useEffect(() => {
		const { address } = Cookies.get();
		if (address) {
			setLoggedInAddress(address);
		}
	}, []);

	const handleLogin = async () => {
		setIsLoading(true);
		await login();
		const { address } = Cookies.get();
		if (address) {
			setLoggedInAddress(address);
		}
		setIsLoading(false);
	};

	const handleLogout = async () => {
		logout();
	};

	return !isLoading ? (
		<Layout title="login | mferspace">
			<Container>
				{!loggedInAddress ? (
					<>
						<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>login</h1>

						<h3>connect your wallet to edit your profile!</h3>
						<br />
						<br />
						<button onClick={handleLogin}>login</button>
					</>
				) : (
					<>
						<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>
							connected wallet
						</h1>

						<h3>{truncateAddress(loggedInAddress)}</h3>
						<br />
						<br />
						<button onClick={handleLogout}>logout</button>
					</>
				)}
			</Container>
		</Layout>
	) : (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				zIndex: 999,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'dodgerblue',
				color: 'white',
			}}
		>
			WAITING...
		</div>
	);
};

export default HomePage;
