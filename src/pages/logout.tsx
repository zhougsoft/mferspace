import React from 'react';
import ServerCookies from 'cookies';

const LogoutPage: React.FC = () => <></>;

export const getServerSideProps = async ({ req, res }: any) => {
	try {
		// Delete auth cookie and redirect to home
		const cookies = new ServerCookies(req, res);
		cookies.set('token', null);
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	} catch (error) {
		console.error(error);
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}
};

export default LogoutPage;
