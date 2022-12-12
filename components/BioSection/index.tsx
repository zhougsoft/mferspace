import React from 'react'
import * as S from './styled'

const DEFAULT_BIO = '...'

interface BioSectionProps {
  name?: string
  bioAbout?: string
  bioMeet?: string
}

export default function BioSection({
  name = 'this mfer',
  bioAbout = DEFAULT_BIO,
  bioMeet = DEFAULT_BIO,
}: BioSectionProps) {
  return (
    <S.Section>
      <S.Article>
        <h4>About {name}</h4>
        <p>{bioAbout}</p>
      </S.Article>
      <S.Article>
        <h4>Who {name} would like to meet</h4>
        <p>{bioMeet}</p>
      </S.Article>
    </S.Section>
  )
}
