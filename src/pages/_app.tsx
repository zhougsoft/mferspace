import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { theme, GlobalStyle } from '../styles'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default App
