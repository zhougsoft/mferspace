import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Profile } from '../interfaces'
import { readAll as getProfiles } from '../services/profiles'
import { useMfers } from '../hooks'
import { Container } from '../components/Shared'
import Layout from '../components/Layout'

function ColorStrip({ colors }: { colors: string[] }) {
  return (
    <div style={{ display: 'flex' }}>
      {colors.map((color: string) => {
        console.log(color)
        return (
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: color,
            }}></div>
        )
      })}
    </div>
  )
}

function ProfileCard({ profile }: { profile: Profile }) {
  const { getMfer } = useMfers()
  const mfer = getMfer(profile.mfer_id)

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

export default function HomePage({ profiles }: { profiles: Profile[] }) {
  return (
    <Layout title="mferspace | a space for mfers">
      <Container>
        <h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
        <h3>a space for mfers</h3>
        <hr />
        {profiles.map(profile => (
          // {profiles.slice(0, 1).map(profile => (
          <ProfileCard key={`pc-${profile.mfer_id}`} profile={profile} />
        ))}
      </Container>
    </Layout>
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
