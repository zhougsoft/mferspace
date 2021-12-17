import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	// TODO: VALIDATION
	// id - number between 0 - 10020
	// tagline - 140 chars
	// pronouns - 50 chars
	// age - 50 chars
	// location - 100 chars
	// link_1 - 50 chars
	// link_2 - 50 chars
	// link_3 - 50 chars

	console.log('\ngot edit req for #', req.body.mferId, '\n\n');

	res.status(200).json({ body: req.body });
}
