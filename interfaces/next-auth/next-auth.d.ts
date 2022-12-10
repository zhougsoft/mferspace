import type { Session as NextAuthSession } from 'next-auth'
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session extends NextAuthSession {
    address: string
    user: {
      address: string
    }
  }
}
