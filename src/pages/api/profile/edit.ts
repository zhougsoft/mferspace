import type { NextApiRequest, NextApiResponse } from 'next';
import { parseAuthCookie } from '../../../services/auth.service';
import { getMferOwner } from '../../../services/mfer.service';
import { updateProfile } from '../../../services/profile.service';

enum MAX_LENGTH {
	NAME = 50,
	TAGLINE = 140,
	AGE = 25,
	PRONOUNS = 50,
	LOCATION = 100,
	LINK = 50,
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		// Validate mfer id
		if (!req.body.mfer_id) {
			return res.status(400).json({ msg: 'no mfer id sent' });
		}
		const mferId = parseInt(req.body.mfer_id);
		if (isNaN(mferId) || mferId < 0 || mferId > 10020) {
			return res.status(400).json({ msg: 'invalid mfer id' });
		}

		// Validate incoming data
		// TODO: replace with a better validation system that will scale when time permits
		const {
			name = '',
			tagline = '',
			age = '',
			pronouns = '',
			location = '',
			link_1 = '',
			link_2 = '',
			link_3 = '',
		} = req.body;

		const nameValid = name?.length <= MAX_LENGTH.NAME;
		const taglineValid = tagline?.length <= MAX_LENGTH.TAGLINE;
		const ageValid = age?.length <= MAX_LENGTH.AGE;
		const pronounsValid = pronouns?.length <= MAX_LENGTH.PRONOUNS;
		const locationValid = location?.length <= MAX_LENGTH.LOCATION;
		const link1Valid = link_1?.length <= MAX_LENGTH.LINK;
		const link2Valid = link_2?.length <= MAX_LENGTH.LINK;
		const link3Valid = link_3?.length <= MAX_LENGTH.LINK;

		const inputIsValid =
			nameValid &&
			taglineValid &&
			ageValid &&
			pronounsValid &&
			locationValid &&
			link1Valid &&
			link2Valid &&
			link3Valid;

		if (!inputIsValid) {
			return res.status(400).json({ msg: 'invalid data sent' });
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

		const profileData = {
			mfer_id: mferId,
			name,
			tagline,
			age,
			pronouns,
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
