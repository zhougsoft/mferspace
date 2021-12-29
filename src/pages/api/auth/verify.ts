import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import Cookies from 'cookies';
import { getNonce, updateNonce } from '../../../services/auth.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// ensure JSON web token secret is set before running verification
		const { JWT_SECRET } = process.env;
		if (!JWT_SECRET) {
			throw new Error("'No value set for 'process.env.JWT_SECRET'");
		}

		// verify/validate request data
		const { address, signature } = req.body;
		if (!address || !signature) {
			return res.status(400).end('Invalid address or signature input');
		}

		// get user's nonce from DB
		const nonce = await getNonce(address);
		if (nonce === 0) {
			return res.status(400).end('No nonce record for address');
		}

		// verify incoming signature
		const signatureAddress = ethers.utils.verifyMessage(
			nonce.toString(),
			signature
		);

		// if valid auth verification, update nonce & respond with JWT cookie
		if (address.toLowerCase() === signatureAddress.toLowerCase()) {
			// sign token with 1 hour expiry
			const token = jwt.sign(
				{
					exp: Math.floor(Date.now() / 1000) + 60 * 60,
					data: {
						address,
						nonce,
					},
				},
				JWT_SECRET
			);

			await updateNonce(address);

			const cookies = new Cookies(req, res);
			cookies.set('token', token, { httpOnly: true });

			return res.status(200).json({ ok: true });
		} else {
			return res.status(403).end('Invalid signature');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).end('Server error');
	}
}
