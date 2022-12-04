// WIP: expansion on the Profile data that OG myspace had
interface ProfileInterests {
  general?: string
  music?: string
  films?: string
  shows?: string
  books?: string
  heroes?: string
}

export const enum ProfileMaxChars {
  Name = 50,
  Tagline = 140,
  Gender = 50,
  Age = 50,
  Location = 50,
  SongUrl = 100,
  BioAbout = 5000,
  BioMeet = 5000,
}

export default interface Profile {
  mfer_id: number
  name?: string
  tagline?: string
  gender?: string
  age?: string
  location?: string
  song_url?: string
  bio_about?: string
  bio_meet?: string
  updated_at?: Date
}
