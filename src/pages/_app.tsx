import type { AppProps } from 'next/app';
import Cookies from 'cookies';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { Web3Provider } from '../contexts/Web3Context';
import { theme, GlobalStyle } from '../styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<Web3Provider>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</Web3Provider>
	);
};

export default App;
