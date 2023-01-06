import { useRouter } from 'next/router'
import { useWeb3 } from '../../../hooks'
import { Container, ExtLink, GithubIcon } from '../../Shared'
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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.9rem',
            }}>
            {isConnected && router.pathname !== '/dashboard' && (
              <S.DashboardLink href="/dashboard">
                go to your dashboard
              </S.DashboardLink>
            )}
            <ConnectWallet />

            <ExtLink href="https://github.com/zhoug0x/mferspace">
              <GithubIcon
                color="white"
                style={{ width: '2rem', marginLeft: '1rem' }}
              />
            </ExtLink>
          </div>
        </div>
      </Container>
    </S.HeaderWrapper>
  )
}
