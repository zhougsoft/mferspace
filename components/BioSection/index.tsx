import React from 'react'
import * as S from './styled'

interface BioSectionProps {
  name?: string
  bioAbout?: string
  bioMeet?: string
}

export default function BioSection({
  name,
  bioAbout,
  bioMeet,
}: BioSectionProps) {
  return (
    <S.Section>
      {bioAbout ? (
        <S.Article>
          <h4>About {name || 'this mfer'}</h4>
          <p>{bioAbout}</p>
        </S.Article>
      ) : (
        <></>
      )}

      {bioMeet ? (
        <S.Article>
          <h4>Who {name} would like to meet</h4>
          <p>{bioMeet}</p>
        </S.Article>
      ) : (
        <></>
      )}
    </S.Section>
  )
}
