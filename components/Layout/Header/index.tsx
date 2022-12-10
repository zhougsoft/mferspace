import React from 'react'
import { Container } from '../../Shared'
import ConnectWallet from '../../ConnectWallet'
import * as S from './styled'

export default function Header() {
  return (
    <S.HeaderWrapper>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <S.HomeLink href="/">mferspace</S.HomeLink>
          <div style={{ fontSize: '0.9rem' }}>
            <ConnectWallet />
          </div>
        </div>
      </Container>
    </S.HeaderWrapper>
  )
}
