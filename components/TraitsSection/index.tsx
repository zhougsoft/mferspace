import type { MferTraits } from 'mfers'
import { makeRandomKey } from '../../utils'
import * as S from './styled'

type Trait = [string, string]

export default function TraitsSection({ traits }: { traits: MferTraits }) {
  const traitEntries: Trait[] = Object.entries(traits)
  return (
    <S.TraitTable>
      <tbody>
        {traitEntries.map(([key, value]) => (
          <tr key={makeRandomKey()}>
            <td>
              <strong>{key}</strong>
            </td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </S.TraitTable>
  )
}
