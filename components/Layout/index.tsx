import React from 'react'
import Head from 'next/head'

import * as S from './styled'
import Header from './Header'

interface LayoutProps {
  title: string
  children?: React.ReactNode
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <S.PageWrapper>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </S.PageWrapper>
  )
}
