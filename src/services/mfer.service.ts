import { ethers } from 'ethers';

import { MFER_CONTRACT_ADDRESS } from '../config/constants';
import abi from '../config/abi.json';
import { Mfer } from '../types';

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
	const tokenIpfsGateway = `https://ipfs.io/ipfs/${ipfsContentId}/${tokenId}`;

	// Fetch mfer image data from IPFS & build a gateway link for the image
	const mferResult = await fetch(tokenIpfsGateway).then(res => res.json());
	const imgIpfsHash = mferResult.image.split('/')[2];
	const imgIpfsGateway = `https://ipfs.io/ipfs/${imgIpfsHash}`;

	return {
		id,
		name: mferResult.name,
		img: imgIpfsGateway,
		attributes: mferResult.attributes,
	};
};
