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

export const updateProfile = async (id: number, data: any) => {


	// THIS IS RAN SERVER SIDE

	// route: /api/profile/edit/[id]
	
	
	// ### TODO ###
	// get the next.js example upsert code in here
	
	// is upsert appropriate? since there will already be rows
	// that is implying that a new row can be created
	// this use-case, a new row will never be created for profiles
	// 1 mfer == 1 profile
	// just a regular 'update' will be fine?
	
	// UPDATE LAST UPDATED:
	// last_updated: new Date()


	// TURBO VALIDATION! protec

};
