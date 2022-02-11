import type { NextApiRequest, NextApiResponse } from 'next';
import { addUserWallet, getNonce } from '../../../services/auth.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		const { address } = req.body;

		// Validate incoming address
		// TODO: this functionality is duped in 'verify.ts' as of this comment
		if (!address || typeof address !== 'string' || address.length !== 42) {
			return res.status(400).end('Invalid address sent');
		}

		// Fetch nonce, if no nonce exists, create new wallet record in DB
		const nonce = await getNonce(address);
		if (nonce === 0) {
			const [newUser] = await addUserWallet(address);
			return res.status(200).json({ nonce: newUser.nonce });
		} else {
			return res.status(200).json({ nonce });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).end('Server error');
	}
}
