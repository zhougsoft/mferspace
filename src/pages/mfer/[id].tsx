import React from 'react';
import { ethers } from 'ethers';

import { MFER_CONTRACT_ADDRESS } from '../../constants';
import abi from '../../abi.json';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';

const MferPage: React.FC = ({ mfer, error }: any) => {
	console.log(mfer);

	if (error) return <h1>server error - check server console</h1>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
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

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		const mferId = parseInt(id);

		// validate param input
		if (mferId === NaN) {
			throw new Error('Invalid ID param - numbers only');
		}

		// mfer ids range between 0 to 10020
		if (mferId < 0 || mferId > 10020) {
			throw new Error(
				'No mfers at requested ID - values between 0 - 10020 only'
			);
		}

		// connect to mfers contract & fetch the mfer ifps hash
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.ETHEREUM_NODE_URL
		);
		const contract = new ethers.Contract(MFER_CONTRACT_ADDRESS, abi, provider);
		const tokenURI: string = await contract.tokenURI(mferId);

		// parse result, build ifps http gateway url from hash
		const tokenParse = tokenURI.split('/');
		const tokenIfpsHash = tokenParse[2];
		const tokenId = tokenParse[3];
		const tokenIfpsGateway = `https://ipfs.io/ipfs/${tokenIfpsHash}/${tokenId}`;

		// fetch mfer img data & build an img gateway link
		const mferResult = await fetch(tokenIfpsGateway).then(res => res.json());
		const imgIfpsHash = mferResult.image.split('/')[2];
		const imgIfpsGateway = `https://ipfs.io/ipfs/${imgIfpsHash}`;

		const mfer = {
			name: mferResult.name,
			img: imgIfpsGateway,
			attributes: mferResult.attributes,
		};

		return { props: { mfer, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default MferPage;
