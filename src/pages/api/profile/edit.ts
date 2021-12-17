import type { NextApiRequest, NextApiResponse } from 'next';
import { updateProfile } from '../../../services/profile.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// validate mfer id
		const id = parseInt(req.body.mfer_id);
		if (id === NaN || id < 0 || id > 10020) {
			return res.status(400).json({ msg: 'invalid id' });
		}

		// TODO: AUTHENICATION HERE
		// address/signature/nonce stuff... new table needed

		const { tagline, pronouns, age, location, link_1, link_2, link_3 } =
			req.body;

		// TODO: INPUT DATA VALIDATION HERE
		// tagline - 140 chars
		// pronouns - 50 chars
		// age - 50 chars
		// location - 100 chars
		// link_1 - 50 chars
		// link_2 - 50 chars
		// link_3 - 50 chars

		const profileData = {
			mfer_id: id,
			tagline,
			pronouns,
			age,
			location,
			link_1,
			link_2,
			link_3,
			last_updated: new Date(),
		};

		await updateProfile(profileData);
		return res.status(200).json({ msg: 'success' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'server error' });
	}
}
