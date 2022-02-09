import type { NextApiRequest, NextApiResponse } from 'next';
import { parseAuthCookie } from '../../../services/auth.service';
import { getMferOwner } from '../../../services/mfer.service';
import { updateProfile } from '../../../services/profile.service';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// Validate mfer id
		const mferId = parseInt(req.body.mfer_id);
		if (mferId === NaN || mferId < 0 || mferId > 10020) {
			return res.status(400).json({ msg: 'invalid mfer id' });
		}

		// Check auth if valid token
		const loggedInAddress = parseAuthCookie(req, res);
		if (!loggedInAddress) {
			return res.status(403).json({ msg: 'invalid auth token' });
		}

		// Check if user is the owner of requested mfer
		const mferOwner = await getMferOwner(mferId);
		const isOwner = loggedInAddress.toLowerCase() === mferOwner.toLowerCase();
		if (!isOwner) {
			return res.status(403).json({
				msg: `${loggedInAddress} is not the holder of mfer #${mferId}`,
			});
		}

		const { tagline, pronouns, age, location, link_1, link_2, link_3 } =
			req.body;

		// TODO: INPUT DATA VALIDATION HERE
		// name - 50 chars
		// tagline - 140 chars
		// pronouns - 50 chars
		// age - 25 chars
		// location - 100 chars
		// link_1 - 50 chars
		// link_2 - 50 chars
		// link_3 - 50 chars

		const profileData = {
			mfer_id: mferId,
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
