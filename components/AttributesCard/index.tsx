import { MferAttribute } from '../../interfaces/Mfer'
import * as S from './styled'

interface AttributesCardProps {
  attributes: MferAttribute[]
}

export default function AttributesCard({
  attributes = [],
}: AttributesCardProps) {
  return (
    <S.TraitTable>
      <tbody>
        {attributes.map((attr, i) => (
          // TODO: write a util that creates a short uuid for component keys
          <tr key={`attr-${i}-${Math.random() * 100}`}>
            <td>
              <strong>{attr.trait_type}</strong>
            </td>
            <td>{attr.value}</td>
          </tr>
        ))}
      </tbody>
    </S.TraitTable>
  )
}
