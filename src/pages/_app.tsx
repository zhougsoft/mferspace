import type { AppProps } from 'next/app';

import { StylesProvider } from '../providers';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<StylesProvider>
			<Component {...pageProps} />
		</StylesProvider>
	);
};

export default App;
