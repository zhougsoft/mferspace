import { ethers } from 'ethers';
import { MFER_CONTRACT_ADDRESS } from '../constants';
import abi from '../abi.json';

interface MferAttribute {
	trait_type: string;
	value: string;
}

interface Mfer {
	id: number;
	name: string;
	img: string;
	attributes: MferAttribute[];
}

// get a single mfer
export const getMfer = async (id: number): Promise<Mfer> => {
	// connect to mfers contract & fetch the mfer ipfs hash
	const provider = new ethers.providers.JsonRpcProvider(
		process.env.ETHEREUM_NODE_URL
	);
	const contract = new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
	const tokenURI: string = await contract.tokenURI(id);

	// parse result, build ipfs http gateway url from hash
	const tokenParse = tokenURI.split('/');
	const tokenIpfsHash = tokenParse[2];
	const tokenId = tokenParse[3];
	const tokenIpfsGateway = `https://ipfs.io/ipfs/${tokenIpfsHash}/${tokenId}`;

	// fetch mfer img data & build an img gateway link
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
