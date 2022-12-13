import { ethers, BigNumber } from 'ethers'
import { useContract } from 'wagmi'
import { MFERS_CONTRACT, mfers } from 'mfers'

import { MFER_IMG_URL } from '../config/constants'
import type { Mfer } from '../interfaces'
import abi from '../config/abi/mfers.json'
import { useWeb3 } from './'

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

  // Get single mfer metadata by id
  const getMfer = (id: number): Mfer => {
    return { id, ...mfers[id], img: `${MFER_IMG_URL}${id}.png` }
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
