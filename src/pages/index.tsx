import React from 'react';
import { ethers } from 'ethers';

import { MFER_CONTRACT_ADDRESS } from '../constants';
import abi from '../abi.json';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

// so typescript doesn't complain about `window.ethereum`
declare let window: any;

const HomePage: React.FC = ({ mfer, error }: any) => {
	console.log(mfer);

	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<h1>🙂 mferspace</h1>
				<h3>a space for mfers</h3>
				<hr />
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.ETHEREUM_NODE_URL
		);

		// connect to mfers contract & fetch the mfer ifps hash
		const contract = new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
		const tokenURI: string = await contract.tokenURI(420);

		// parse result, build ifps http gateway url from hash
		const tokenParse = tokenURI.split('/');
		const ifpsHashToken = tokenParse[2];
		const mferId = tokenParse[3];
		const ifpsGatewayToken = `https://ipfs.io/ipfs/${ifpsHashToken}/${mferId}`;

		// fetch mfer img data & build an img gateway link
		const mferResult = await fetch(ifpsGatewayToken).then(res => res.json());
		const ifpsImgHash = mferResult.image.split('/')[2];
		const mferImgUrl = `https://ipfs.io/ipfs/${ifpsImgHash}`;

		const mfer = {
			name: mferResult.name,
			img: mferImgUrl,
			attributes: mferResult.attributes,
		};

		return { props: { mfer, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default HomePage;
