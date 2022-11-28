import styled from 'styled-components';

export const Section = styled.section`
	display: flex;
`;

export const ProfilePicDisplay = styled.div`
	margin-right: 2rem;

	h2 {
		margin: 0;
	}

	div.img-wrapper {
		margin: 1.5rem 0;
	}
`;

export const ProfileInfo = styled.div`
	align-self: center;

	ul {
		list-style: none;
		padding: 0;

		li {
			color: ${({ theme }) => theme.colors.textSecondary};
		}
	}
`;
