import { useMemo } from 'react';
import { ethers, Contract, BigNumber } from 'ethers';
import {
	MFER_CONTRACT_ADDRESS,
	MFER_DATA_CID,
	MFER_IMG_CID,
	IPFS_GATEWAY,
} from '../config/constants';
import abi from '../config/abi/mfers.json';



// TODO: SORT OUT CHAIN AND IPFS CALL FOR THIS



// TODO: type provider arg as Ethers.js type provider
const useMfers = (provider: any) => {
	const contract = useMemo<Contract>(
		() => new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider),
		[provider]
	);

	// Get all mfer ids owned by a specific address
	const getMfersByAddress = async (address: string) => {
		const balResult: BigNumber = await contract.balanceOf(address);
		const mferBal = balResult.toNumber();

		const tokenIds: number[] = [];
		for (let i = 0; i < mferBal; i++) {
			const token: BigNumber = await contract.tokenOfOwnerByIndex(address, i);
			tokenIds.push(token.toNumber());
		}
		return tokenIds;
	};

	// Get single mfer metadata by id
	const getMfer = async (id: number) => {
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


	// // Get single mfer metadata by id
	// const getMfer = async (id: number) => {
	// 	// Fetch mfers metadata from IPFS
	// 	const dataUrl = `${IPFS_GATEWAY}/${MFER_DATA_CID}/${id}`;
	// 	const imgUrl = `${IPFS_GATEWAY}/${MFER_IMG_CID}`;

	// 	// Fetch mfer image data from IPFS & build a gateway link for the image
	// 	const mferResult = await fetch(dataUrl).then(res => res.json());


	// 	console.log(imgUrl)
	// 	return {
	// 		id,
	// 		name: mferResult.name,
	// 		img: imgUrl,
	// 		attributes: mferResult.attributes,
	// 	};
	// };



	return { getMfersByAddress, getMfer };
};

export default useMfers;
