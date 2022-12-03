import { ethers } from 'ethers'
import abi from '../config/abi/mfers.json'
import { Mfer } from '../interfaces'
import { MFER_CONTRACT_ADDRESS, IPFS_GATEWAY } from '../config/constants'

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
  return new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider)
}

// Get data for a single mfer by id
export async function getMfer(id: number): Promise<Mfer> {
  // Fetch mfer tokenURI
  const contract = getMfersContract()
  const tokenURI: string = await contract.tokenURI(id)

  // Build IPFS gateway URL from IPFS content identifier hash
  const uriSplit = tokenURI.split('/')
  const ipfsContentId = uriSplit[2]
  const tokenId = uriSplit[3]
  const tokenIpfsGateway = `${IPFS_GATEWAY}/${ipfsContentId}/${tokenId}`

  // Fetch mfer image data from IPFS & build a gateway link for the image
  const mferResult = await fetch(tokenIpfsGateway).then(res => res.json())
  const imgIpfsHash = mferResult.image.split('/')[2]
  const img = `${IPFS_GATEWAY}/${imgIpfsHash}`

  return {
    id,
    name: mferResult.name,
    img,
    attributes: mferResult.attributes,
  }
}

// Get the address holding a specific mfer id
export async function getMferOwner(id: number): Promise<string> {
  const contract = getMfersContract()
  const mferOwner = contract.ownerOf(id)
  return mferOwner
}
