import { useMemo } from 'react';
import { ethers, Contract, BigNumber } from 'ethers';

import abi from '../config/abi/mfers.json';
import {
	MFER_CONTRACT_ADDRESS,
	MFER_DATA_CID,
	IPFS_GATEWAY,
} from '../config/constants';

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
		const ipfsURI = `${IPFS_GATEWAY}/${MFER_DATA_CID}/${id}`;

		// Fetch mfer data
		const mfer = await fetch(ipfsURI).then(res => res.json());

		// Build image link
		const imgCID = mfer.image.slice(7);
		const img = `${IPFS_GATEWAY}/${imgCID}`;

		return {
			id,
			name: mfer.name,
			img,
			attributes: mfer.attributes,
		};
	};

	return { getMfersByAddress, getMfer };
};

export default useMfers;
