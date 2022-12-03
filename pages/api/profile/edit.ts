import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import Profile, { ProfileMaxChars } from '../../../interfaces/Profile'

import { getMferOwner } from '../../../services/mfers'
import { update as updateProfile } from '../../../services/profiles'
import { isValidMferId } from '../../../utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ msg: string; data?: Profile }> // TODO: type the response data
) {
  try {
    // get active address from session, send 403 response if no session found
    const session = await getSession({ req })
    if (!session?.address) {
      return res.status(403).json({ msg: 'authentication required' })
    }
    const activeAddress = session.address

    // validate mfer id input
    if (!req.body.mfer_id) {
      return res.status(400).json({ msg: 'no mfer id sent' })
    }
    const mferId = parseInt(req.body.mfer_id)
    if (!isValidMferId(mferId)) {
      return res.status(400).json({ msg: 'invalid mfer id' })
    }

    // validate incoming request data
    const {
      name = '',
      tagline = '',
      gender = '',
      age = '',
      location = '',
      song_url = '',
      bio_about = '',
      bio_meet = '',
    } = req.body

    const nameValid = name.length <= ProfileMaxChars.Name
    const taglineValid = tagline.length <= ProfileMaxChars.Tagline
    const genderValid = gender.length <= ProfileMaxChars.Gender
    const ageValid = age.length <= ProfileMaxChars.Age
    const locationValid = location.length <= ProfileMaxChars.Location
    const songUrl = song_url.length <= ProfileMaxChars.SongUrl
    const bioAboutValid = bio_about.length <= ProfileMaxChars.BioAbout
    const bioMeetValid = bio_meet.length <= ProfileMaxChars.BioMeet

    const inputIsValid =
      nameValid &&
      taglineValid &&
      genderValid &&
      ageValid &&
      locationValid &&
      songUrl &&
      bioAboutValid &&
      bioMeetValid

    if (!inputIsValid) {
      return res.status(400).json({ msg: 'invalid data in request' })
    }

    // check that session address is the same as the mfer holder address
    const mferOwner = await getMferOwner(mferId)
    const isOwner = activeAddress.toLowerCase() === mferOwner.toLowerCase()
    if (!isOwner) {
      return res.status(403).json({
        msg: `${activeAddress} is not the owner of mfer #${mferId}`,
      })
    }

    // write profile updates to the database
    const updateResult = await updateProfile({
      mfer_id: mferId,
      name,
      tagline,
      gender,
      age,
      location,
      song_url,
      bio_about,
      bio_meet,
    })

    return res.status(200).json({ msg: 'success', data: updateResult })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'server error' })
  }
}
