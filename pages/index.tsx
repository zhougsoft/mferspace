import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import type { Profile } from '../interfaces'
import { readAll as getProfiles } from '../services/profiles'
import { makeRandomKey } from '../utils'
import { Container, IconEmoji } from '../components/Shared'
import Layout from '../components/Layout'

const MferImgAccent = styled.img`
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  width: 8.2rem;
  min-width: 8.2rem;
  border-left: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 0 4px 4px 0;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: inline;
  }
`

const ProfileInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;

  div.profile-info-head {
    width: 10rem;
    margin-right: 1rem;

    & > img {
      width: 100%;
      min-width: 10rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
        min-width: unset;
      }
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      width: 7rem;
      margin-right: 1rem;
      min-width: unset;
    }
  }

  div.profile-info-name {
    font-size: 1.6rem;

    & > h3 {
      margin: 0;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      font-size: 1.45rem;
    }
  }
`

function ProfileInfo({ profile }: { profile: Profile }) {
  return (
    <ProfileInfoWrapper>
      <div className="profile-info-head">
        <img
          src={`https://heads.mfers.dev/${profile.mfer_id}.png`}
          alt={`the head of mfer #${profile.mfer_id}`}
        />
      </div>
      <div className="profile-info-name">
        <h3>{profile.name}</h3>
        <small>{`mfer #${profile.mfer_id}`}</small>
      </div>
    </ProfileInfoWrapper>
  )
}

const ProfileCardWrapper = styled.div`
  position: relative;
  z-index: 1;
  text-align: right;
  max-width: 60rem;

  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  padding: 0rem 2rem 0 0;
  margin-bottom: 1rem;
  transition: 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: 0.5rem 1rem;
  }
`

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/mfer/${profile.mfer_id}`}>
      <ProfileCardWrapper>
        <ProfileInfo profile={profile} />
        <MferImgAccent src={`https://plain.mfers.dev/${profile.mfer_id}.png`} />
      </ProfileCardWrapper>
    </Link>
  )
}

const HomeHeaderWrapper = styled.div`
  margin-bottom: 2rem;

  h1.header-title {
    font-size: 3rem;
    margin: 0 0.5rem 0 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: 4rem;
    }
  }

  div.header-subtext {
    font-size: 1.5rem;
    letter-spacing: -0.05em;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
      font-size: 2.5rem;
    }
  }
`

function HomeHeader() {
  return (
    <HomeHeaderWrapper>
      <h1 className="header-title">a space for mfers</h1>
      <div className="header-subtext">
        <IconEmoji emoji="👇" alt="hand pointing down" /> check these mfers out
      </div>
    </HomeHeaderWrapper>
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
        <HomeHeader />
        {profiles ? (
          profiles.map(profile => (
            <ProfileCard key={makeRandomKey()} profile={profile} />
          ))
        ) : (
          <div>no profiles found...</div>
        )}
      </Container>
    </Layout>
  )
}
