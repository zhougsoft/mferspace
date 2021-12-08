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

// on-chain data for mfers handled in this hook
const useMfers = () => {
    
	// get a single mfer
	const getMfer = async (id: number): Promise<Mfer> => {
		// connect to mfers contract & fetch the mfer ifps hash
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.ETHEREUM_NODE_URL
		);
		const contract = new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
		const tokenURI: string = await contract.tokenURI(id);

		// parse result, build ifps http gateway url from hash
		const tokenParse = tokenURI.split('/');
		const tokenIfpsHash = tokenParse[2];
		const tokenId = tokenParse[3];
		const tokenIfpsGateway = `https://ipfs.io/ipfs/${tokenIfpsHash}/${tokenId}`;

		// fetch mfer img data & build an img gateway link
		const mferResult = await fetch(tokenIfpsGateway).then(res => res.json());
		const imgIfpsHash = mferResult.image.split('/')[2];
		const imgIfpsGateway = `https://ipfs.io/ipfs/${imgIfpsHash}`;

		return {
			id,
			name: mferResult.name,
			img: imgIfpsGateway,
			attributes: mferResult.attributes,
		};
	};

	return { getMfer };
};

export default useMfers;
