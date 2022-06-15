import { useMemo } from 'react';
import { ethers, Contract, BigNumber } from 'ethers';
import { MFER_CONTRACT_ADDRESS } from '../config/constants';
import abi from '../config/abi/mfers.json';

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

	return { getMfersByAddress };
};

export default useMfers;
