import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

import { getNonce, updateNonce } from '../../../services/auth.service';
import { AUTH_TIMEOUT } from '../../../config/constants';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// Ensure JSON web token secret is set before running verification
		const { JWT_SECRET } = process.env;
		if (!JWT_SECRET) {
			throw new Error("'No value set for 'process.env.JWT_SECRET'");
		}

		// Verify required fields were sent in the request data
		const { address, signature } = req.body;
		if (!signature) {
			return res.status(400).end('No signature sent');
		}

		// Validate incoming address
		// TODO: the below functionality is duped in 'nonce.ts' as of this comment
		if (!address || typeof address !== 'string' || address.length !== 42) {
			return res.status(400).end('Invalid address sent');
		}

		// Fetch the current nonce for user from the DB
		const nonce = await getNonce(address);
		if (nonce === 0) {
			return res.status(400).end('No nonce record for address');
		}

		// Verify incoming signature was signed with the nonce
		const signatureAddress = ethers.utils.verifyMessage(
			nonce.toString(),
			signature
		);

		// If valid auth verification, generate new nonce in DB & respond with JWT cookie
		if (address.toLowerCase() === signatureAddress.toLowerCase()) {
			const token = jwt.sign(
				{
					expiresIn: AUTH_TIMEOUT,
					data: { address },
				},
				JWT_SECRET
			);

			await updateNonce(address);

			const cookies = new Cookies(req, res);
			cookies.set('token', token, {
				maxAge: AUTH_TIMEOUT * 1000,
				httpOnly: true,
				sameSite: true,
			});

			return res.status(200).json({ ok: true });
		} else {
			return res.status(403).end('Invalid signature');
		}
	} catch (error) {
		console.error(error);
		return res.status(500).end('Server error');
	}
}
