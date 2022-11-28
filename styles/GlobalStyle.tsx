import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

	@font-face {
		font-family: 'Benton Sans';
		src: url('/fonts/Benton-Sans-Regular.otf');
	}

	body {
		font-size: 16px;
		font-family: ${({ theme }) => theme.fonts.main};
		color: ${({ theme }) => theme.colors.text};
		background-color: ${({ theme }) => theme.colors.background};

		// Increase global font size on larger viewports
		@media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
			font-size: 1.25em;
		}
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: ${({ theme }) => theme.fonts.secondary};
	}
	
	a {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.link};

		&:visited {
			color: ${({ theme }) => theme.colors.link};
		}

		&:hover {
			opacity: 0.75;
		}

	}
`;
