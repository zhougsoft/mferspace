import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { AuthProvider } from '../contexts/AuthContext';
import { theme, GlobalStyle } from '../styles';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</AuthProvider>
	);
};

export default App;
