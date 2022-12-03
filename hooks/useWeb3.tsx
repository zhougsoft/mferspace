import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// --- wagmi utils
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
  useProvider,
  useNetwork,
  useSignMessage,
} from 'wagmi'

// --- providers
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'

// --- connectors
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

interface Web3ProviderProps {
  children?: ReactNode
}

// wrapper for wagmi config provider
export function Web3Provider({ children }: Web3ProviderProps) {
  // setup & detect providers based on credentials in env
  const providers = [publicProvider()]
  const { ALCHEMY_ID, INFURA_ID } = process.env
  if (ALCHEMY_ID) {
    providers.push(alchemyProvider({ apiKey: ALCHEMY_ID }))
  }
  if (INFURA_ID) {
    providers.push(infuraProvider({ apiKey: INFURA_ID }))
  }

  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    providers
  )

  // setup wagmi client with connectors and providers
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })

  return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default function useWeb3() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { connect, connectors, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()
  const provider = useProvider()
  const { chain: activeChain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  // to check if mounted so that wallet connection code executes
  // exclusively on the client side, avoiding re-hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // apply wallet setting change handlers on mount
  useEffect(() => {
    const { ethereum } = window
    if (isMounted && ethereum?.on) {
      ethereum.on('accountsChanged', () => {
        router.reload()
      })

      ethereum.on('chainChanged', () => {
        router.reload()
      })
    }
  }, [isMounted])

  return isMounted
    ? {
        isConnected,
        address,
        activeChain,
        connectors,
        pendingConnector,
        provider,
        connect,
        disconnect,
        signMessageAsync,
      }
    : {}
}
