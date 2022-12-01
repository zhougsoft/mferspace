import { ethers, BigNumber } from 'ethers'
import { useContract } from 'wagmi'

import { useWeb3 } from '../hooks'
import abi from '../config/abi/mfers.json'
import {
  MFER_CONTRACT_ADDRESS,
  MFER_DATA_CID,
  IPFS_GATEWAY,
} from '../config/constants'
import { Mfer } from '../interfaces'

// TODO: type provider arg as Ethers.js type provider
export default function useMfers() {
  const { provider } = useWeb3()
  const contract = useContract({
    address: MFER_CONTRACT_ADDRESS,
    abi,
    signerOrProvider: provider,
  })

  // Get all mfer ids owned by a specific address
  const getMfersByAddress = async (address: string): Promise<number[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!contract?.provider)
          throw new Error('provider was undefined in getMfersByAddress()')

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
  const getMfer = async (id: number): Promise<Mfer> => {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch mfer data
        const ipfsURI = `${IPFS_GATEWAY}/${MFER_DATA_CID}/${id}`
        const mferData = await fetch(ipfsURI).then(res => res.json())

        // Build image link
        const imgCID = mferData.image.slice(7)
        const img = `${IPFS_GATEWAY}/${imgCID}`

        // format & resolve Mfer
        const mfer: Mfer = {
          id,
          name: mferData.name,
          img,
          attributes: mferData.attributes,
        }
        resolve(mfer)
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
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

  return { getMfersByAddress, getMfer, checkMferOwnership }
}
