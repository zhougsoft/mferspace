import { useRouter } from 'next/router';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

import {
	addUserWallet,
	getNonce,
	updateNonce,
} from '../../../services/auth.service';

// EXAMPLE:
// https://github.com/amaurym/login-with-metamask-demo/blob/41f1ff4297c6ab179d1b8a6b980dde479bf2945c/packages/backend/src/services/auth/controller.ts

// verifying signatures:
// https://docs.ethers.io/v5/api/utils/signing-key/#utils-verifyMessage

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// TODO: VALIDATE THIS DATA!
		const { address, signature } = req.body;

		// get user's nonce from DB
		const nonce = await getNonce(address);
		if (nonce === 0) {
			throw new Error(`No nonce found for address ${address}`);
		}

		// verify incoming signature
		const signatureAddress = ethers.utils.verifyMessage(
			nonce.toString(),
			signature
		);

		// good verification, update nonce & send back JWT for auth
		if (address.toLowerCase() === signatureAddress.toLowerCase()) {

			// TODO: do JWT stuff

			await updateNonce(address);
			return res.status(200).json({ msg: 'user authenicated!' });
		} else {
			return res.status(403).end('Invalid signature');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).end('Server error');
	}
}
