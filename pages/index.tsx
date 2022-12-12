import Link from 'next/link'
import type { Profile, Mfer } from '../interfaces'
import { readAll as getProfiles } from '../services/profiles'
import { useMfers } from '../hooks'
import { makeRandomKey } from '../utils'
import { Container } from '../components/Shared'
import Layout from '../components/Layout'

function ColorStrip({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: 'flex' }}>
      {colors.map((color: string) => (
        <div
          key={makeRandomKey()}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: color,
          }}></div>
      ))}
    </div>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  const { getMfer } = useMfers()
  const mfer: Mfer = getMfer(profile.mfer_id)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h3 style={{ marginRight: '4rem' }}>{profile.name}</h3>
        <ColorStrip colors={mfer.colors} />
      </div>
      <small>
        <pre>{JSON.stringify({ profile, mfer }, null, 2)}</pre>
      </small>
      <hr />
    </>
  )
}

// fetch & return all profiles from database
export async function getServerSideProps() {
  try {
    const profiles = await getProfiles()
    return { props: { profiles, error: false } }
  } catch (error) {
    console.error(error)
    return { props: { error: true } }
  }
}

export default function HomePage({ profiles }: { profiles: Profile[] }) {
  return (
    <Layout title="mferspace | a space for mfers">
      <Container>
        <h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
        <h3>a space for mfers</h3>
        <hr />
        {profiles.map(profile => (
          <ProfileCard key={makeRandomKey()} profile={profile} />
        ))}
      </Container>
    </Layout>
  )
}
