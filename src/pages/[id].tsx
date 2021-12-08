import React from 'react';
import { ethers } from 'ethers';

import { MFER_CONTRACT_ADDRESS } from '../constants';
import abi from '../abi.json';

import { Container } from '../components/Shared';
import Layout from '../components/Layout';

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.ETHEREUM_NODE_URL
		);

		// connect to mfers contract & fetch the mfer ifps hash
		const contract = new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
		const tokenURI: string = await contract.tokenURI(id);

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

const MferPage: React.FC = ({ mfer, error }: any) => {
	console.log(mfer);

	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title="mferspace | a space for mfers">
			<Container>
				<div style={{ display: 'flex' }}>
					<div style={{ marginRight: '2rem' }}>
						<h2 style={{ margin: '0' }}>{mfer.name}</h2>
						<img
							src={mfer.img}
							alt={mfer.name}
							style={{ width: '100px', margin: '2.5rem 0' }}
						/>

						<br />
						<br />
						<br />
						<div>View My:</div>
						<div>Pics | Videos</div>
					</div>

					<div>
						<br />
						<br />
						<div>"It's all about me!!"</div>

						<br />
						<ul style={{ listStyle: 'none', padding: '0' }}>
							<li>Female</li>
							<li>22 years old</li>
							<li>SAN FRANCISCO, CALIFORNIA</li>
							<li>United States</li>
						</ul>
						<br />

						<div>Online Now!</div>

						<br />
						<div>Last Login: 10/10/2007</div>
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export default MferPage;
