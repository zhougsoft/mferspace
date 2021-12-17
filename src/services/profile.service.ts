import { supabase } from '../supabase';

// here be the db plumbing for mfer profiles
// RUN SERVER SIDE ONLY due to .env considerations

// TODO: finish this type
interface Profile {}

// TODO: add return type as 'Profile'
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

// TODO: type arg as 'Profile'
export const updateProfile = async (profileData: any) => {
	let { error, status } = await supabase
		.from('profiles')
		.update(profileData, {
			returning: 'minimal',
		})
		.match({ mfer_id: profileData.mfer_id });

	if (error && status !== 406) {
		throw error;
	}
};
