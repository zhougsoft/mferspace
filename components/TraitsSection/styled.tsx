import styled from 'styled-components'

export const TraitTable = styled.table`
  margin-bottom: 1rem;
  width: 100%;

  tr {
    td {
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border-radius: 5px;

      &:first-child {
        background: ${({ theme }) => theme.colors.blueLight};
        color: ${({ theme }) => theme.colors.blueDarkest};
        text-align: right;
      }

      &:last-child {
        background: ${({ theme }) => theme.colors.blueLightest};
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }
`
