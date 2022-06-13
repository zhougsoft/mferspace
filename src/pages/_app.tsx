import type { AppProps } from 'next/app';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { theme, GlobalStyle } from '../styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Web3ReactProvider getLibrary={provider => new Web3Provider(provider)}>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</Web3ReactProvider>
	);
};

export default App;
