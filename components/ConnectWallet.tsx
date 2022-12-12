import { useWeb3, useAuth } from '../hooks'
import { truncateAddress } from '../utils'

// handles wallet connection buttons & connection flow
export default function ConnectWallet() {
  const {
    isConnected,
    address,
    connectors,
    pendingConnector,
    connect,
    disconnect,
  } = useWeb3()
  const { signOut } = useAuth()

  // if no wallet connected
  if (!isConnected && connect) {
    return (
      <>
        <span style={{ color: 'white', marginRight: '0.25rem' }}>
          <em>🔌 connect wallet:</em>
        </span>
        {connectors.map(connector => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
            style={{
              fontWeight: 'bold',
              padding: '0.25rem',
              margin: '0 0.25rem',
            }}>
            {connector.name.toLowerCase()}
            {!connector.ready && ' (unsupported)'}
            {connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))}
      </>
    )
  }

  // if wallet is connected
  if (isConnected && address) {
    return (
      <>
        <span style={{ color: 'white', marginRight: '0.25rem' }}>
          <em>⚡ connected: {truncateAddress(address)}</em>
        </span>
        <button
          onClick={() => {
            disconnect()
            signOut()
          }}
          style={{
            fontWeight: 'bold',
            padding: '0.25rem',
            margin: '0 0.25rem',
          }}>
          logout
        </button>
      </>
    )
  }

  // is busy or wallet not ready
  return <>{'...'}</>
}
