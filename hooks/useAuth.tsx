import { useSession, signIn, signOut } from 'next-auth/react'

export default function useAuth() {
  const { data: session, status } = useSession()

  const loading = status === 'loading'





  // TODO: implement SIWE here
  async function handleSignIn() {
    await signIn()
  }





  

  async function handleSignOut() {
    await signOut()
  }

  return { session, loading, signIn: handleSignIn, signOut: handleSignOut }
}
