import { supabase } from '../supabase';

// here be the db plumbing for wallet authentication
// RUN SERVER SIDE ONLY due to .env considerations

// TODO: finish this type
export interface UserWallet {
	address: string;
	nonce: number;
}

const _generateNonce = () => Math.floor(Math.random() * 1000000);

export const addUserWallet = async (address: string): Promise<any> => {
	const { data, error, status } = await supabase
		.from('wallets')
		.insert({ address, nonce: _generateNonce() });

	if (error && status !== 406) {
		throw error;
	}

	return data;
};

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
