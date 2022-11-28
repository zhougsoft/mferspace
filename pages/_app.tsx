import type { AppProps } from 'next/app'
import { Web3Provider } from '../hooks/useWeb3'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { theme, GlobalStyle } from '../styles'

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Normalize />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Web3Provider>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
          </SessionProvider>
        </Web3Provider>
      </ThemeProvider>
    </>
  )
}
