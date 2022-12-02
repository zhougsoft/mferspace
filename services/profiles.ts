import sql from '../db'
import type { Row } from 'postgres'
import type Profile from '../interfaces/Profile'
import { serializeJSON } from '../utils'

const parseProfile = (data: Row): any => {
  const profileData = {
    mferId: data.mfer_id,
    name: data.name || undefined,
    tagline: data.tagline || undefined,
    gender: data.gender || undefined,
    age: data.age || undefined,
    location: data.location || undefined,
    songUrl: data.song_url || undefined,
    bioAbout: data.bio_about || undefined,
    bioMeet: data.bio_meet || undefined,
    lastUpdated: data.last_updated || undefined,
  }

  return serializeJSON(profileData)
}

export async function read(mferId: number): Promise<Profile> {
  const [data] = await sql`
    SELECT DISTINCT * FROM profiles WHERE mfer_id=${mferId} ORDER BY mfer_id
  `
  return parseProfile(data)
}

export async function update(
  mferId: number,
  profile: Profile
): Promise<Profile> {
  const [data] = await sql<Profile[]>`
    UPDATE profiles SET
    name=${profile.name || ''}
    tagline=${profile.tagline || ''}
    gender=${profile.gender || ''}
    age=${profile.age || ''}
    location=${profile.location || ''}
    songUrl=${profile.songUrl || ''}
    bioAbout=${profile.bioAbout || ''}
    bioMeet=${profile.bioMeet || ''}
    WHERE mfer_id=${mferId}
    RETURNING *
  `
  return parseProfile(data)
}
