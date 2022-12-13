import sql from '../db'
import type { Profile } from '../interfaces'
import { serializeJSON, isValidMferId } from '../utils'

// get single profile database record by mfer id
export async function read(mferId: number): Promise<Profile> {
  if (!isValidMferId(mferId)) {
    throw Error(`invalid mfer id - received: ${mferId}`)
  }

  const [data] = await sql<Profile[]>`
    SELECT DISTINCT * FROM profiles WHERE mfer_id=${mferId};
  `

  if (!data) {
    throw Error(`no profile record found in database for mfer id: ${mferId}`)
  }
  return serializeJSON(data)
}

// get all profiles that have been updated before
export async function readAll(): Promise<Profile[]> {
  const data = await sql<Profile[]>`
    SELECT DISTINCT * FROM profiles WHERE updated_at IS NOT NULL ORDER BY updated_at DESC;
  `
  return serializeJSON(data)
}

// update profile database record
export async function update(profile: Profile): Promise<Profile> {
  if (!isValidMferId(profile.mfer_id)) {
    throw Error(`invalid mfer id - received: ${profile.mfer_id}`)
  }

  const [data] = await sql<Profile[]>`
    UPDATE profiles SET
    name=${profile.name || null},
    tagline=${profile.tagline || null},
    gender=${profile.gender || null},
    age=${profile.age || null},
    location=${profile.location || null},
    media_url=${profile.media_url || null},
    bio_about=${profile.bio_about || null},
    bio_meet=${profile.bio_meet || null}
    WHERE mfer_id=${profile.mfer_id}
    RETURNING *;
  `
  if (!data) {
    throw Error(
      `no record returned after profile update for mfer id: ${profile.mfer_id}`
    )
  }
  return serializeJSON(data)
}
