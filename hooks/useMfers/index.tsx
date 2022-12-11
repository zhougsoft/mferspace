import { ethers, BigNumber } from 'ethers'
import { useContract } from 'wagmi'
import { MFERS_CONTRACT, mfers } from 'mfers'

import type { Mfer } from '../../interfaces'
import { IPFS_GATEWAY } from '../../config/constants'
import abi from '../../config/abi/mfers.json'
import cids from './img-cids.json'
import { useWeb3 } from '../../hooks'

export default function useMfers() {
  const { provider } = useWeb3()
  const contract = useContract({
    address: MFERS_CONTRACT,
    abi,
    signerOrProvider: provider,
  })

  // Get all mfer ids owned by a specific address
  const getMfersOwned = async (address: string): Promise<number[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!contract?.provider)
          throw new Error('provider was undefined in getMfersOwned()')

        const balResult: BigNumber = await contract.balanceOf(address)
        const mferBal = balResult.toNumber()
        const tokenIds: number[] = []

        for (let i = 0; i < mferBal; i++) {
          const token: BigNumber = await contract.tokenOfOwnerByIndex(
            address,
            i
          )
          tokenIds.push(token.toNumber())
        }
        resolve(tokenIds)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  // TODO: update Mfer type
  // Get single mfer metadata by id
  const getMfer = (id: number): any => {
    return { ...mfers[id], img: `${IPFS_GATEWAY}/${cids[id]}` }
  }

  // Check if an address is the holder of an mfer by id
  const checkMferOwnership = async (
    id: number,
    address: string
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!contract) throw new Error('mfers contract instance was null')
        const { getAddress } = ethers.utils
        const owner = await contract.ownerOf(id)
        resolve(getAddress(owner) === getAddress(address))
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })

    // const owner = await contract.ownerOf(id)
    // return ethers.utils.getAddress(owner) === ethers.utils.getAddress(address)
  }

  return { getMfersOwned, getMfer, checkMferOwnership }
}
