import styled from 'styled-components'

export const Section = styled.section`
  max-width: 30rem;
`

export const ProfileDisplay = styled.div`
  display: flex;
  margin-bottom: 1rem;

  img {
    border-radius: 5px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  & div:first-of-type {
    margin-right: 1.25rem;
  }
`
