


// TODO: 

// refactor this to be compatible with the updated Mfer interface

// rename this to the "TraitsSection"

// rename  "attributes" things to "traits" for brevity


import * as S from './styled'


interface MferAttribute {
  trait_type: string
  value: string
}



interface AttributesSectionProps {
  attributes: MferAttribute[]
}


export default function AttributesSection({
  attributes = [],
}: AttributesSectionProps) {

return <div>TODO: UPDATE TRAITS SECTION</div>

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
