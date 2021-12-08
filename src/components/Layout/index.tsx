import React from 'react';
import Head from 'next/head';

import * as S from './styled';
import Header from './Header';

interface LayoutProps {
	title: string;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
	return (
		<S.PageWrapper>
			<Head>
				<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
				<link href="/fonts/fonts.css" rel="stylesheet" />
				<title>{title}</title>
			</Head>
			<Header />
			<main className="page-content">{children}</main>
		</S.PageWrapper>
	);
};

export default Layout;
