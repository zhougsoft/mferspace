import sql from '../db'
import type Profile from '../interfaces/Profile'

export async function read(mferId: number) {
  return await sql<Profile[]>`
    SELECT DISTINCT * FROM profiles WHERE mfer_id=${mferId} ORDER BY mfer_id
  `
}

export async function readAll() {
  return await sql<Profile[]>`SELECT * FROM profiles ORDER BY mfer_id`
}

export async function update(mferId: number, profile: Profile) {
  return await sql<Profile[]>`
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
}
