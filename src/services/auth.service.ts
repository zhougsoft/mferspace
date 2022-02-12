import { supabase } from '../db';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

// This service hosts the plumbing for any wallet/token authentication
// running server side only due to private .env variables

export interface UserWallet {
	address: string;
	nonce: number;
}

// Generates a random 6 digit nonce
const _generateNonce = () => Math.floor(Math.random() * 1000000);

// Create a new wallet record with a random nonce
export const addUserWallet = async (address: string): Promise<any> => {
	const { data, error, status } = await supabase
		.from('wallets')
		.insert({ address, nonce: _generateNonce() });

	if (error && status !== 406) {
		throw error;
	}

	return data;
};

// Fetches current nonce from wallet record
export const getNonce = async (address: string): Promise<number> => {
	const { data, error, status } = await supabase
		.from('wallets')
		.select('nonce')
		.eq('address', address)
		.single();

	if (error && status !== 406) {
		throw error;
	}

	return data ? data.nonce : 0;
};

// Creates a new random nonce in wallet record
export const updateNonce = async (address: string): Promise<any> => {
	const { error, status } = await supabase
		.from('wallets')
		.update(
			{ nonce: _generateNonce() },
			{
				returning: 'minimal',
			}
		)
		.match({ address });

	if (error && status !== 406) {
		throw error;
	}
};

// Consume serverside req/res objects and parse verified address from valid auth cookie
// returns: address string if authenticated, null if not
export const parseAuthCookie = (req: any, res: any): string | null => {
	try {
		// Get authentication cookie
		const cookies = new Cookies(req, res);
		const authToken = cookies.get('token');
		if (!authToken) return null;

		// Validate JWT environment variable set
		const { JWT_SECRET } = process.env;
		if (!JWT_SECRET) {
			throw new Error("No value set for 'process.env.JWT_SECRET'");
		}

		// Verify auth token & return result
		const decodedToken = jwt.verify(authToken, JWT_SECRET);
		if (typeof decodedToken === 'string') {
			return null;
		}
		return decodedToken?.data?.address || null;
	} catch (error) {
		console.error(error);
		return null;
	}
};
