import Link from 'next/link'
import styled from 'styled-components'
import type { Profile, Mfer } from '../interfaces'
import { readAll as getProfiles } from '../services/profiles'
import { useMfers } from '../hooks'
import { makeRandomKey } from '../utils'
import { Container } from '../components/Shared'
import Layout from '../components/Layout'

const ProfileCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #888;
  color: black;
  padding: 0 0 0 1rem;
  margin-bottom: 1rem;

  &:hover {
    transform: scale(102%);
  }
`

function ColorStrip({ colors }: { colors: string[] }) {
  return (
    <span role="img" style={{ display: 'flex' }}>
      {colors.map((color: string) => (
        <span
          key={makeRandomKey()}
          style={{
            width: '15px',
            height: '75px',
            backgroundColor: color,
          }}></span>
      ))}
    </span>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  const { getMfer } = useMfers()
  const mfer: Mfer = getMfer(profile.mfer_id)

  return (
    <Link href={`/mfer/${profile.mfer_id}`}>
      <ProfileCardWrapper>
        <div>
          <h3 style={{ margin: '0 4rem 0 0' }}>{profile.name}</h3>
          <small>{`mfer #${profile.mfer_id}`}</small>
        </div>
        <div style={{ display: 'flex' }}>
          <ColorStrip colors={mfer.colors} />
        </div>
      </ProfileCardWrapper>
    </Link>
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
