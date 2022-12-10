import styled from 'styled-components'

export const TraitTable = styled.table`
  margin-bottom: 1rem;

  tr {
    td {
      font-size: 0.95rem;
      padding: 0.25rem 0.5rem;

      &:first-child {
        background: ${({ theme }) => theme.colors.blueLight};
        color: ${({ theme }) => theme.colors.blueDarkest};
      }

      &:last-child {
        background: ${({ theme }) => theme.colors.blueLightest};
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }
`
