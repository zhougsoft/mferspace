// TODO: update this so it works with the new authentication flow

import type { NextApiRequest, NextApiResponse } from 'next'
import { getMferOwner } from '../../../services/mfers'

const enum MAX_LENGTH {
  NAME = 50,
  TAGLINE = 140,
  AGE = 25,
  PRONOUNS = 50,
  LOCATION = 100,
  LINK = 50,
  BIO = 5000,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any> // TODO: type the response data
) {
  try {







    // TODO: delete this placeholder when not required
    let activeAddress = ''

    // TODO: guard route with authentication
    // if (notAuthenticated) {
    //   return res.status(403).json({ msg: 'authentication required' })
    // }






    // Validate mfer id
    if (!req.body.mfer_id) {
      return res.status(400).json({ msg: 'no mfer id sent' })
    }
    const mferId = parseInt(req.body.mfer_id)
    if (isNaN(mferId) || mferId < 0 || mferId > 10020) {
      return res.status(400).json({ msg: 'invalid mfer id' })
    }

    // Validate incoming data
    // TODO: replace with scalable validation pattern
    const {
      name = '',
      tagline = '',
      age = '',
      pronouns = '',
      location = '',
      bio_1 = '',
      bio_2 = '',
    } = req.body

    const nameValid = name?.length <= MAX_LENGTH.NAME
    const taglineValid = tagline?.length <= MAX_LENGTH.TAGLINE
    const ageValid = age?.length <= MAX_LENGTH.AGE
    const pronounsValid = pronouns?.length <= MAX_LENGTH.PRONOUNS
    const locationValid = location?.length <= MAX_LENGTH.LOCATION
    const bioOneValid = bio_1?.length <= MAX_LENGTH.BIO
    const bioTwoValid = bio_2?.length <= MAX_LENGTH.BIO

    const inputIsValid =
      nameValid &&
      taglineValid &&
      ageValid &&
      pronounsValid &&
      locationValid &&
      bioOneValid &&
      bioTwoValid

    if (!inputIsValid) {
      return res.status(400).json({ msg: 'invalid data sent' })
    }

    // Check if user is the owner of requested mfer
    const mferOwner = await getMferOwner(mferId)
    const isOwner = activeAddress.toLowerCase() === mferOwner.toLowerCase()
    if (!isOwner) {
      return res.status(403).json({
        msg: `${activeAddress} is not the holder of mfer #${mferId}`,
      })
    }

    const profileData = {
      mfer_id: mferId,
      name,
      tagline,
      age,
      pronouns,
      location,
      bio_1,
      bio_2,
    }

    // TODO: write the updates to the DB
    // await updateProfile(profileData)

    return res.status(200).json({ msg: 'success' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }
}
