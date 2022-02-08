import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import ServerCookies from 'cookies';

import { useAuthContext } from '../contexts/AuthContext';
import { truncateAddress } from '../utils';
import { Container } from '../components/Shared';
import Layout from '../components/Layout';

interface LoginPageProps {
	loggedInAddress: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ loggedInAddress }) => {
	const router = useRouter();
	const { login } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = async () => {
		setIsLoading(true);
		await login();
		router.reload();
	};

	return !isLoading ? (
		<Layout title="login | mferspace">
			<Container>
				{loggedInAddress ? (
					<>
						<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>logged in:</h1>
						<h3>{truncateAddress(loggedInAddress)}</h3>
						<br />
						<br />
						<Link href="/logout">
							<a>logout</a>
						</Link>
					</>
				) : (
					<>
						<h1 style={{ fontSize: '3rem', marginBottom: '0' }}>login</h1>
						<h3>login with your wallet to edit your profile!</h3>
						<br />
						<br />
						<button onClick={handleLogin}>login</button>
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
				fontFamily: 'monospace',
			}}
		>
			LOADING...
		</div>
	);
};

export const getServerSideProps = async ({ req, res, query }: any) => {
	try {
		// Get authentication cookies
		const cookies = new ServerCookies(req, res);
		const authToken = cookies.get('token');

		// If no existing auth, redirect to login page
		if (!authToken) {
			return { props: { error: false } };
		}

		// Validate auth token
		const { JWT_SECRET } = process.env;
		if (!JWT_SECRET) {
			throw new Error("No value set for 'process.env.JWT_SECRET'");
		}
		const decodedToken = jwt.verify(authToken, JWT_SECRET);
		if (!decodedToken || typeof decodedToken === 'string') {
			return { props: { error: false } };
		}

		// Auth token is valid, return authenticated address
		const {
			data: { address },
		} = decodedToken;
		return { props: { loggedInAddress: address, error: false } };
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return { props: { error: false } };
		} else {
			console.error(error);
			return { props: { error: true } };
		}
	}
};

export default LoginPage;
