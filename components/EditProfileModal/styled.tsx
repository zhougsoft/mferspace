import styled from 'styled-components';

export const ModalWrapper = styled.div`
	outline: 0.25rem solid ${({ theme }) => theme.colors.blueDark};
	background-color: ${({ theme }) => theme.colors.background};
	padding: 1.5rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  max-height: 100vh;
  width: fit-content;
`;
