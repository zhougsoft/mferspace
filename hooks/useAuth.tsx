import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useWeb3 } from './'

export default function useAuth() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { isConnected, address, activeChain, signMessageAsync } = useWeb3()

  // sign-in with Ethereum
  async function handleSignIn() {
    if (!isConnected || !address || !activeChain) {
      console.warn(
        'WARNING: useAuth - handleSignIn() was called with no wallet connection'
      )
      return
    }

    try {
      // build message for user to sign in their wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum',
        uri: window.location.origin,
        version: '1',
        chainId: activeChain.id,
        nonce: await getCsrfToken(),
      })

      // prompt the user to sign the message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // authenticate user's signature
      await signIn('credentials', {
        message: JSON.stringify(message),
        signature,
        redirect: false,
      })
    } catch (error: any) {
      if (error.code === 'ACTION_REJECTED') {
        return
      }

      console.error(error)
      alert('error signing in...\nyou could try refreshing the page?')
    }
  }

  // sign out and force a postback
  async function handleSignOut() {
    await signOut()
    router.reload()
  }

  return { session, status, signIn: handleSignIn, signOut: handleSignOut }
}
