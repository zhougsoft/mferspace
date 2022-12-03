import { DefaultTheme } from 'styled-components';

// Update 'DefaultTheme' interface in 'styled.d.ts' when adding new props!
const theme: DefaultTheme = {
	fonts: {
		main: 'Benton Sans',
		secondary: 'Benton Sans',
		monospace: 'monospace',
	},
	colors: {
		text: '#303030',
		textSecondary: '#888',
		textAlt: '#FFF',
		link: 'dodgerblue',
		background: '#FFF',
		orange: '#fb7515',
		blueLightest: '#d6ecf9',
		blueLight: '#b1d1f3',
		blue: '#6598ce',
		blueDark: '#4d7eb3',
		blueDarkest: '#235d9e',
	},
	// Pixel values for 'min-width'
	breakpoints: {
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
	},
};

export default theme;
