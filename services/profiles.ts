import sql from '../db'
import type { Profile } from '../interfaces'
import { serializeJSON, isValidMferId } from '../utils'

export async function read(mferId: number): Promise<Profile> {
  if (!isValidMferId(mferId)) {
    throw Error(`invalid mfer id - received: ${mferId}`)
  }

  const [data] = await sql<Profile[]>`
    SELECT DISTINCT * FROM profiles WHERE mfer_id=${mferId} ORDER BY mfer_id
  `

  if (!data) {
    throw Error(`no profile record found in database for mfer id: ${mferId}`)
  }
  return serializeJSON(data)
}

export async function update(
  mferId: number,
  profile: Profile
): Promise<Profile> {
  if (!isValidMferId(mferId)) {
    throw Error(`invalid mfer id - received: ${mferId}`)
  }

  const [data] = await sql<Profile[]>`
    UPDATE profiles SET
    name=${profile.name || ''}
    tagline=${profile.tagline || ''}
    gender=${profile.gender || ''}
    age=${profile.age || ''}
    location=${profile.location || ''}
    songUrl=${profile.song_url || ''}
    bioAbout=${profile.bio_about || ''}
    bioMeet=${profile.bio_meet || ''}
    WHERE mfer_id=${mferId}
    RETURNING *
  `
  if (!data) {
    throw Error(
      `no record returned after profile update for mfer id: ${mferId}`
    )
  }
  return serializeJSON(data)
}
