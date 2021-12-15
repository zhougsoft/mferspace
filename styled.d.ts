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
			textSecondary: string;
			textAlt: string;
			link: string;
			background: string;
			orange: string;
			blueLightest: string;
			blueLight: string;
			blue: string;
			blueDark: string;
			blueDarkest: string;
		};
		breakpoints: {
			sm: number;
			md: number;
			lg: number;
			xl: number;
		};
	}
}
