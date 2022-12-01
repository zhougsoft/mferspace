import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { truncateAddress } from '../utils'
import { useWeb3, useMfers } from '../hooks'
import { Container, ExtLink } from '../components/Shared'
import Layout from '../components/Layout'

export default function HomePage() {
  const { address, isConnected } = useWeb3()
  const { getMfersByAddress } = useMfers()

  const [mferIds, setMferIds] = useState<number[]>([])

  // Fetch owned mfers when wallet connects
  useEffect(() => {
    if (address) {
      getMfersByAddress(address).then(tokenIds => {
        setMferIds(tokenIds)
      })
    }
  }, [address])

  const renderStatus = () => {
    if (!isConnected) {
      return <div>no wallet connected...</div>
    }

    if (isConnected && address) {
      return (
        <div>
          connected: {truncateAddress(address)}
          {mferIds.length > 0 ? (
            <>
              <div>mfer hodler detected!</div>
              <ol>
                {mferIds.map(id => (
                  <li key={'mfer-' + id}>
                    <Link href={`/mfer/${id}`}>{`mfer #${id}`}</Link>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div>no mfers detected in wallet...</div>
          )}
        </div>
      )
    }
  }

  return (
    <Layout title="mferspace | a space for mfers">
      <Container>
        <h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
        <h3>a space for mfers</h3>
        <small>
          <em>
            mferspace is a work in progress by{' '}
            <ExtLink href="https://twitter.com/zhoug0x">zhoug</ExtLink>
          </em>
        </small>
        <hr />
        {renderStatus()}
      </Container>
    </Layout>
  )
}
