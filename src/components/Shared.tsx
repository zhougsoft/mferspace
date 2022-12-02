import styled from 'styled-components';

// a link that goes off-page
export const ExtLink: React.FC<any> = ({ children, ...props }) => (
	<a {...props} target="_blank" rel="noreferrer noopener">
		{children}
	</a>
);

// the general responsive content container
export const Container = styled.div`
	max-width: 100%;
	padding-right: 2rem;
	padding-left: 2rem;
	margin-right: auto;
	margin-left: auto;

	@media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
		max-width: ${({ theme }) => theme.breakpoints.sm * 0.94}px;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
		max-width: ${({ theme }) => theme.breakpoints.md * 0.94}px;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
		max-width: ${({ theme }) => theme.breakpoints.lg * 0.94}px;
	}

	@media (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
		max-width: ${({ theme }) => theme.breakpoints.xl * 0.94}px;
	}
`;
