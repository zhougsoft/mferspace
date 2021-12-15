import styled from 'styled-components';

export const Heading = styled.div`
	& > h1 {
		font-size: 3rem;
		margin-bottom: 0;
	}

	& > div {
		display: flex;
		align-items: center;

		& h3 {
			margin-right: 0.75rem;
		}
	}
`;

export const InfoSection = styled.section`
	width: fit-content;
	font-family: serif;
	font-style: italic;
	padding: 1rem;
	margin: 2rem 0 3rem 0;
	outline: 1px solid lightblue;
    
	& > p {
        margin-top: 0;
		line-height: 1.75rem;
	}
`;

export const ExampleSection = styled.section`
	& > h4 {
        font-style: italic;
	}
    
    & > pre {
        width: fit-content;
        outline: 1px solid #999;
        padding: 0.4rem 0.75rem;
    }

`;
