import { useWeb3 } from '../hooks'

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

  // no wallet connected
  if (!isConnected && connect) {
    return (
      <>
        {connectors.map(connector => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}>
            {connector.name.toLowerCase()}
            {!connector.ready && ' (unsupported)'}
            {connector.id === pendingConnector?.id && ' (connecting)'}
          </button>
        ))}
      </>
    )
  }

  // wallet is connected
  if (isConnected && address) {
    return (
      <>
        <button onClick={() => disconnect()}>disconnect</button>
        {' ~ '}
        <span>
          <em>connected: {address}</em>
        </span>
      </>
    )
  }

  // is busy or wallet not ready
  return <>...</>
}
