import { useWeb3 } from '../hooks'

export default function ConnectWallet() {
  const { ConnectKitButton } = useWeb3()
  return ConnectKitButton ? <ConnectKitButton /> : <>{'...'}</>
}
