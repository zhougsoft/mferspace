import React from 'react'
import * as S from './styled'

const DEFAULT_BIO = '...'

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
      <S.Article>
        <h4>About {name || 'this mfer'}</h4>
        <p>{bioAbout || DEFAULT_BIO}</p>
      </S.Article>
      <S.Article>
        <h4>Who {name} would like to meet</h4>
        <p>{bioMeet || DEFAULT_BIO}</p>
      </S.Article>
    </S.Section>
  )
}
