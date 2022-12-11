import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Profile } from '../interfaces'
import { readAll as getProfiles } from '../services/profiles'
import { Container } from '../components/Shared'
import Layout from '../components/Layout'

export default function HomePage({ profiles }: { profiles: Profile[] }) {
  return (
    <Layout title="mferspace | a space for mfers">
      <Container>
        <h1 style={{ fontSize: '3rem', marginBottom: '0' }}>mferspace</h1>
        <h3>a space for mfers</h3>
        <hr />
        <small>
          <pre>{JSON.stringify(profiles, null, 2)}</pre>
        </small>
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
    console.log(error)
    return { props: { error: true } }
  }
}
