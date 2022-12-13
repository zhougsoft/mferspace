import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { utils } from 'ethers'

import Profile, { ProfileMaxChars } from '../../../interfaces/Profile'
import { getMferOwner } from '../../../services/mfers'
import { update as updateProfile } from '../../../services/profiles'
import {
  cleanSoundcloudLink,
  isValidMferId,
  isValidSoundCloudLink,
} from '../../../utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Profile }> // TODO: type the response data
) {
  try {
    // get active address from session, send 403 response if no session found
    const session = await getSession({ req })
    if (!session?.address) {
      return res.status(403).end()
    }
    const activeAddress = session.address

    // validate mfer id input
    if (!req.body.mfer_id) {
      return res.status(400).end()
    }
    const mferId = parseInt(req.body.mfer_id)
    if (!isValidMferId(mferId)) {
      return res.status(400).end()
    }

    // validate incoming request data
    const {
      name = '',
      tagline = '',
      gender = '',
      age = '',
      location = '',
      media_url = '',
      twitter = '',
      bio_about = '',
      bio_meet = '',
    } = req.body

    const nameValid = name.length <= ProfileMaxChars.Name
    const taglineValid = tagline.length <= ProfileMaxChars.Tagline
    const genderValid = gender.length <= ProfileMaxChars.Gender
    const ageValid = age.length <= ProfileMaxChars.Age
    const locationValid = location.length <= ProfileMaxChars.Location

    let mediaUrlValid = true
    if (media_url) {
      const mediaLength = media_url.length <= ProfileMaxChars.MediaUrl
      const validSoundcloud = isValidSoundCloudLink(media_url)
      mediaUrlValid = mediaLength && validSoundcloud
    }

    const twitterValid = twitter.length <= ProfileMaxChars.Twitter
    const bioAboutValid = bio_about.length <= ProfileMaxChars.BioAbout
    const bioMeetValid = bio_meet.length <= ProfileMaxChars.BioMeet

    const inputIsValid =
      nameValid &&
      taglineValid &&
      genderValid &&
      ageValid &&
      locationValid &&
      mediaUrlValid &&
      twitterValid &&
      bioAboutValid &&
      bioMeetValid

    if (!inputIsValid) {
      return res.status(400).end()
    }

    // check that session address is the same as the mfer holder address
    const mferOwner = await getMferOwner(mferId)
    const isOwner =
      utils.getAddress(activeAddress) === utils.getAddress(mferOwner)

    // validate authentication
    if (!isOwner) {
      return res.status(403).end()
    }

    // write profile updates to the database
    const updateResult = await updateProfile({
      mfer_id: mferId,
      name,
      tagline,
      gender,
      age,
      location,
      media_url: cleanSoundcloudLink(media_url),
      twitter,
      bio_about,
      bio_meet,
    })

    return res.status(200).json({ data: updateResult })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
