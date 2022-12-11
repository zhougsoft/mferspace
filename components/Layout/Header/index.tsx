import { useRouter } from 'next/router'
import { useWeb3 } from '../../../hooks'
import { Container } from '../../Shared'
import ConnectWallet from '../../ConnectWallet'
import * as S from './styled'

export default function Header() {
  const router = useRouter()
  const { isConnected } = useWeb3()

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
            {isConnected && router.pathname !== '/dashboard' && (
              <S.DashboardLink href="/dashboard">
                go to your dashboard
              </S.DashboardLink>
            )}
            <ConnectWallet />
          </div>
        </div>
      </Container>
    </S.HeaderWrapper>
  )
}
