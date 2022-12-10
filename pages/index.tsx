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
          {mferIds.length > 0 ? (
            <>
              <h3>
                {mferIds.length === 1 ? 'mfer' : 'mfers'} found in wallet:{' '}
                <em>{truncateAddress(address)}</em>
              </h3>
              <p>
                <em>
                  click {mferIds.length === 1 ? 'the' : 'an'} mfer to view/edit
                  their mferspace profile!
                </em>
              </p>
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
            <Link href="/mfer/3191">zhoug</Link>
          </em>
        </small>
        <hr />
        {renderStatus()}
      </Container>
    </Layout>
  )
}
