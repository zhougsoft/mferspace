import type { NextApiRequest, NextApiResponse } from 'next';
import {
	createUserWallet,
	getNonce,
	updateNonce,
} from '../../services/auth.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// validate incoming data
		console.log('req body:\n', req.body);

		// ~*~* AUTH FLOW *~*~

		// get address from request body

		// does user have a record?

		//      if no record, make new record & generate/write a nonce, but keep nonce in memory

		// get the user's nonce by address

		// user signs the nonce

		// backend verifies the signature

		// backend generate/writes a nonce to prevent same sig being used again

		// backend sends back JWT (1hr expiry)

		// ~*~* ~*~*~*~*~ *~*~

		console.log('creating wallet record...');
		const MY_ADDY = '0xc99547f73B0Aa2C69E56849e8986137776D72474';
		const newUserWallet = await createUserWallet(MY_ADDY);
		console.log('\nwallet record created!\n', newUserWallet);

		console.log('testing wallet nonce fetch...');
		const nonce = await getNonce(MY_ADDY);
		console.log('\nwallet nonce fetched!\n', nonce);

		console.log('testing updating the nonce...');
		await updateNonce(MY_ADDY);
		console.log('\nnonce updated!\n');

		console.log('fetching nonce to see if it changed...');
		const newNonce = await getNonce(MY_ADDY);
		console.log('\nupdated nonce!\n', newNonce);

		return res.status(200).json({ msg: 'ok' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'server error' });
	}
}
