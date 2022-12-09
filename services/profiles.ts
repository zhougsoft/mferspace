import sql from '../db'
import type { Profile } from '../interfaces'
import { serializeJSON, isValidMferId } from '../utils'

// get single profile database record by mfer id
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

// update profile database record
export async function update(profile: Profile): Promise<Profile> {
  if (!isValidMferId(profile.mfer_id)) {
    throw Error(`invalid mfer id - received: ${profile.mfer_id}`)
  }

  const [data] = await sql<Profile[]>`
    UPDATE profiles SET
    name=${profile.name || ''},
    tagline=${profile.tagline || ''},
    gender=${profile.gender || ''},
    age=${profile.age || ''},
    location=${profile.location || ''},
    media_url=${profile.media_url || ''},
    bio_about=${profile.bio_about || ''},
    bio_meet=${profile.bio_meet || ''}
    WHERE mfer_id=${profile.mfer_id}
    RETURNING *
  `
  if (!data) {
    throw Error(
      `no record returned after profile update for mfer id: ${profile.mfer_id}`
    )
  }
  return serializeJSON(data)
}
