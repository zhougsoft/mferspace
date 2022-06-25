import styled from 'styled-components';

export const Section = styled.section`
	margin-top: 1.5rem;
`;

export const Article = styled.article`
	margin-bottom: 1.5rem;
	
	h5 {
		color: ${({ theme }) => theme.colors.orange};
		margin: 0;
	}

	p {
		font-size: 0.8rem;
	}
`;
