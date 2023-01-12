import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { truncateAddress, makeRandomKey } from '../utils'
import { useWeb3, useMfers } from '../hooks'
import { Container } from '../components/Shared'
import Layout from '../components/Layout'

export default function DashboardPage() {
  const { address, isConnected } = useWeb3()
  const { getMfersOwned } = useMfers()
  const [mferIds, setMferIds] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch owned mfers when wallet connects
  useEffect(() => {
    if (address) {
      setIsLoading(true)
      getMfersOwned(address)
        .then((tokenIds: any) => {
          setMferIds(tokenIds)
        })
        .catch((error: Error) => {
          console.error(error)
          alert('error fetching mfers')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [address])

  const renderStatus = () => {
    if (!isConnected) {
      return <div>no wallet connected...</div>
    }

    if (isLoading) {
      return <div>loading...</div>
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
                  <li key={makeRandomKey()}>
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
    <Layout title="dashboard | mferspace">
      <Container>
        <h1 style={{ fontSize: '3rem', marginBottom: '0' }}>dashboard</h1>
        <hr />
        {renderStatus()}
      </Container>
    </Layout>
  )
}
