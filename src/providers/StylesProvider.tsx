import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { theme, GlobalStyle } from '../styles';

const StylesProvider: React.FC = ({ children }) => {
	return (
		<>
			<Normalize />
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</>
	);
};

export default StylesProvider;
