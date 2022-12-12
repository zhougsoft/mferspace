import { ethers } from 'ethers'
import { MFERS_CONTRACT } from 'mfers'
import abi from '../config/abi/mfers.json'

// reads .env for API keys and returns a URL for available nodes
function getNodeUrl() {
  const { ALCHEMY_ID, INFURA_ID } = process.env
  if (!ALCHEMY_ID && !INFURA_ID) {
    throw Error('no Alchemy or Infura API keys found in .env')
  }

  // if no alchemy API key, use infura
  if (ALCHEMY_ID) return `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
  return `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
}

// Connect to mfers contract via RPC
function getMfersContract() {
  const provider = new ethers.providers.JsonRpcProvider(getNodeUrl())
  return new ethers.Contract(MFERS_CONTRACT, abi, provider)
}

// Get the address holding a specific mfer id
export async function getMferOwner(id: number): Promise<string> {
  const contract = getMfersContract()
  const mferOwner = contract.ownerOf(id)
  return mferOwner
}
