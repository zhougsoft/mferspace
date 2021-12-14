import { supabase } from '../supabase';

// here be the db plumbing for mfer profiles

// TODO: finish this type
interface Profile {}

export const getProfile = async (id: number) => {
	const { data, error, status } = await supabase
		.from('profiles')
		.select()
		.eq('mfer_id', id)
		.single();

	if (error && status !== 406) {
		throw error;
	}

	return data;
};

export const updateProfile = async (id: number, data: any) => {};
