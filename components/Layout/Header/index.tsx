import React from 'react'
import Link from 'next/link'

import * as S from './styled'
import { Container } from '../../Shared'
import ConnectWallet from '../../ConnectWallet'

const Header: React.FC = () => {
  return (
    <S.HeaderWrapper>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Link href="/" passHref>
            <S.HomeLink>mferspace</S.HomeLink>
          </Link>
          <div style={{ fontSize: '0.9rem' }}>



            {/* TODO: bring back in connect wallet after confirmed not causing hydration error */}
            {/* <ConnectWallet /> */}


          </div>
        </div>
      </Container>
    </S.HeaderWrapper>
  )
}

export default Header
