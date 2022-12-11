import { MferAttribute } from '../../interfaces/Mfer'
import * as S from './styled'

interface AttributesSectionProps {
  attributes: MferAttribute[]
}

export default function AttributesSection({
  attributes = [],
}: AttributesSectionProps) {
  return (
    <S.TraitTable>
      <tbody>
        {attributes.map(attr => (
          // TODO: write a util that creates a short uuid for component keys
          <tr key={`attr-${Math.random() * Math.random() * 100}`}>
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
