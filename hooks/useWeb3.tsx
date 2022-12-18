import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  WagmiConfig,
  createClient,
  useAccount,
  useConnect,
  useDisconnect,
  useProvider,
  useNetwork,
  useSignMessage,
} from 'wagmi'

import {
  ConnectKitProvider,
  getDefaultClient,
  ConnectKitButton,
} from 'connectkit'

interface Web3ProviderProps {
  children?: ReactNode
}

// wrapper for wagmi + connectkit providers
export function Web3Provider({ children }: Web3ProviderProps) {
  const { ALCHEMY_ID, INFURA_ID } = process.env

  // setup wagmi client with connectkit
  const client = createClient(
    getDefaultClient({
      appName: 'mferspace',
      alchemyId: ALCHEMY_ID,
      infuraId: INFURA_ID,
    })
  )

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}

// TODO:
interface UseWeb3 {}

// TODO: add typing the return object: UseWeb3
export default function useWeb3(): any {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { connect } = useConnect()
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
        console.log('accountsChanged')
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
        provider,
        connect,
        disconnect,
        signMessageAsync,
        ConnectKitButton,
      }
    : {}
}
