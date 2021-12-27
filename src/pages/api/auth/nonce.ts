import type { NextApiRequest, NextApiResponse } from 'next';
import { addUserWallet, getNonce } from '../../../services/auth.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// TODO: VALIDATE THIS DATA!
		const { address } = req.body;
		const nonce = await getNonce(address);

		// if nonce 0, no user exists. create new user & generate nonce
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
