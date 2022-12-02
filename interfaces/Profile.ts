// WIP: expansion on the Profile data that OG myspace had
interface ProfileInterests {
  general?: string
  music?: string
  films?: string
  shows?: string
  books?: string
  heroes?: string
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
  last_updated?: Date
}
