import { DefaultTheme } from 'styled-components';

// Update 'DefaultTheme' interface in 'styled.d.ts' when adding new props!
const theme: DefaultTheme = {
	fonts: {
		main: 'sans-serif',
		secondary: 'serif',
		monospace: 'monospace',
	},
	colors: {
		text: '#333',
		lightText: '#555',
		link: 'dodgerblue',
		background: '#FFF',
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
