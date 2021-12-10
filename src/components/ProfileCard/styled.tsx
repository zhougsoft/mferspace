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
		margin: 2.5rem 0;
	}
`;

export const ProfileInfo = styled.div`
	align-self: center;

	ul {
		list-style: none;
		padding: 0;

		li {
			color: #999;
		}
	}

	div.social-links {
		color: #999;
	}

	div.update-msg {
		font-size: 0.75rem;
		margin-top: 1rem;
	}
`;
