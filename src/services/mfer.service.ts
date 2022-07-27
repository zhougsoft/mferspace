import { ethers } from 'ethers';
import abi from '../config/abi/mfers.json';
import { Mfer } from '../types';
import { MFER_CONTRACT_ADDRESS, IPFS_GATEWAY } from '../config/constants';

// For handling all mfers data fetching logic

// Connect to mfers contract via RPC
const _getMfersContract = () => {
	const provider = new ethers.providers.JsonRpcProvider(
		process.env.ETHEREUM_NODE_URL
	);
	return new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
};

// Get data for a single mfer by id
export const getMfer = async (id: number): Promise<Mfer> => {
	// Fetch mfer tokenURI
	const contract = _getMfersContract();
	const tokenURI: string = await contract.tokenURI(id);

	// Build IPFS gateway URL from IPFS content identifier hash
	const uriSplit = tokenURI.split('/');
	const ipfsContentId = uriSplit[2];
	const tokenId = uriSplit[3];
	const tokenIpfsGateway = `${IPFS_GATEWAY}/${ipfsContentId}/${tokenId}`;

	// Fetch mfer image data from IPFS & build a gateway link for the image
	const mferResult = await fetch(tokenIpfsGateway).then(res => res.json());
	const imgIpfsHash = mferResult.image.split('/')[2];
	const img = `${IPFS_GATEWAY}/${imgIpfsHash}`;

	return {
		id,
		name: mferResult.name,
		img,
		attributes: mferResult.attributes,
	};
};

// Get the address holding a specific mfer id
export const getMferOwner = async (id: number): Promise<string> => {
	const contract = _getMfersContract();
	const mferOwner = contract.ownerOf(id);
	return mferOwner;
};
