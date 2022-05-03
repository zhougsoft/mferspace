import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';

const BASE_REGISTRAR_ADDRESS = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const MFERS_ADDRESS = '0x79FCDEF22feeD20eDDacbB2587640e45491b757f';
import abiENS from '../config/abi/ens.json';
import abiMfers from '../config/abi/mfers.json';

// so TypeScript allows `window.ethereum`
declare const window: any;

const checkENS = async (name: string, provider: any) => {

	const resolvedAddress = await provider.resolveName(name);

	// AUTH MFER:

	// 1. derive token id from ens name
	// https://docs.ens.domains/dapp-developer-guide/ens-as-nft#deriving-tokenid-from-ens-name
	const BigNumber = ethers.BigNumber;
	const utils = ethers.utils;


	// 2. get the owner address of the ens token from base registrar
	const registrarContract = new ethers.Contract(
		BASE_REGISTRAR_ADDRESS,
		abiENS,
		provider
	);


	// 3. get the owner address of the mfer id in question from mfers contract
	const mfersContract = new ethers.Contract(MFERS_ADDRESS, abiMfers, provider);



	// does mfer owner == ens owner address? does mfer owner == resolved ens address?

	// if true, then good auth

	// if false, not a holder of the mfer in any valid address!


    
	return { resolvedAddress };
};

const ENSPage: React.FC = () => {
	useEffect(() => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		checkENS('tsugalabs.eth', provider).then(result => {
			console.log(result);
		});
	}, []);

	return (
		<Layout title="ens test">
			<h1>ens test</h1>
		</Layout>
	);
};

export default ENSPage;
