import styled from 'styled-components';

export const HeaderWrapper = styled.header`
	background: ${({ theme }) => theme.colors.blue};
	border-bottom: 1px solid ${({ theme }) => theme.colors.blueDark};
	padding: 0.75rem 0;
	margin-bottom: 2rem;
`;

export const HomeLink = styled.a`
	cursor: pointer;
	color: ${({ theme }) => theme.colors.textAlt};
	font-size: 1.25rem;
	font-weight: bold;
`;
