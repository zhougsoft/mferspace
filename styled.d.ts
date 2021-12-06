import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		fonts: {
			main: string;
			secondary: string;
			monospace: string;
		};
		colors: {
			text: string;
			lightText: string;
			link: string;
			background: string;
		};
		breakpoints: {
			sm: number;
			md: number;
			lg: number;
			xl: number;
		};
	}
}
