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
  mferId: number
  name?: string
  tagline?: string
  gender?: string
  age?: string
  location?: string
  songUrl?: string
  bioAbout?: string
  bioMeet?: string
  lastUpdated?: Date
}
