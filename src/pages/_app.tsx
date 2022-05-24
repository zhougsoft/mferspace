import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Web3Provider from '../contexts/Web3Context';
import AuthProvider from '../contexts/AuthContext';
import { theme, GlobalStyle } from '../styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Web3Provider>
			<AuthProvider>
				<Normalize />
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Component {...pageProps} />
				</ThemeProvider>
			</AuthProvider>
		</Web3Provider>
	);
};

export default App;
