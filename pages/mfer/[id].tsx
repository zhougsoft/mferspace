import React, { useState, useEffect } from 'react'

import type { Mfer, Profile } from '../../interfaces'
import { read as readProfile } from '../../services/profiles'
import { useWeb3, useMfers } from '../../hooks'
import { isValidMferId } from '../../utils'
import theme from '../../styles/theme'

import { Container, IconEmoji } from '../../components/Shared'
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard'
import SoundCloudEmbed from '../../components/SoundCloudEmbed'
import AttributesCard from '../../components/AttributesCard'
import BioSection from '../../components/BioSection'
import TwitterTimeline from '../../components/TwitterTimeline'
import EditProfileModal from '../../components/EditProfileModal'

interface ProfilePageProps {
  mferId: number
  profile: Profile
  error?: any
}

export default function ProfilePage({
  mferId,
  profile,
  error,
}: ProfilePageProps) {
  const { address } = useWeb3()
  const { getMfer, checkMferOwnership } = useMfers()
  const [mfer, setMfer] = useState<Mfer>()
  const [isMferOwner, setIsMferOwner] = useState<boolean>()
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>()

  // Fetch mfer data on page load
  useEffect(() => {
    if (mferId !== undefined) {
      getMfer(mferId).then(async result => setMfer(result))
    }
  }, [mferId])

  // Check if connected wallet owns mfer
  useEffect(() => {
    if (address && mferId !== undefined) {
      checkMferOwnership(mferId, address).then(result => {
        setIsMferOwner(result)
      })
    }
  }, [address, mferId])

  const onEditProfileClick = () => {
    setEditModalIsOpen(true)
  }

  const onEditModalClose = () => {
    setEditModalIsOpen(false)
  }

  if (error || isNaN(mferId))
    return (
      <h1>
        <IconEmoji emoji="💀" alt="skull icon" />
        server error - check backend console
      </h1>
    )
  if (!mfer) return <div>fetching mfer...</div>

  return (
    <Layout title={`${mfer.name} | mferspace`}>
      <Container style={{ marginTop: '1rem' }}>
        {/* --- edit profile button --- --- */}
        {isMferOwner && (
          <button
            onClick={onEditProfileClick}
            disabled={editModalIsOpen}
            style={{ marginBottom: '0.5rem' }}>
            <IconEmoji emoji="✎" alt="pencil edit icon" />
            <em>edit profile</em>
          </button>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
          <div style={{ marginRight: '3rem' }}>
            {/* --- profile card --- */}
            <ProfileCard mfer={mfer} profile={profile} />

            {/* --- mferspace url display --- */}
            <div
              style={{
                display: 'inline-block',
                width: '23rem',
                fontSize: '0.9rem',
                border: `2px solid ${theme.colors.blueLight}`,
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
              }}>
              <strong>
                mferspace URL <small>- dev mode</small>
              </strong>
              <br />
              <pre style={{ margin: '0.25rem 0 0 0 ' }}>
                https://dev.mferspace.com/mfer/{mferId}
              </pre>
            </div>

            {/* --- soundcloud embed --- */}
            {profile?.song_url && (
              <>
                <SoundCloudEmbed
                  url={profile.song_url}
                  width="25rem"
                  height={150}
                />
                <br />
              </>
            )}

            {/* --- attributes --- */}
            <AttributesCard attributes={mfer.attributes} />
          </div>

          <div>

          {/* --- bio --- */}
          <BioSection
            name={mfer.name}
            bioAbout={profile?.bio_about}
            bioMeet={profile?.bio_meet}
            />


{/* sure why not lol */}
{mferId == 3191 && (
          <>
            <hr />
            <TwitterTimeline username="zhoug0x" height={600} />
          </>
        )}
        {/* ------------ */}


            </div>

          {editModalIsOpen && (
            <EditProfileModal
              mferId={mferId}
              profile={profile}
              onClose={onEditModalClose}
            />
          )}
        </div>
        
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async ({ query: { id } }: any) => {
  try {
    // redirect home if invalid id route param sent
    if (!isValidMferId(id)) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    // fetch & return profile data
    const profile = await readProfile(id)
    return { props: { mferId: id, profile, error: false } }
  } catch (error) {
    console.log(error)
    return { props: { error: true } }
  }
}
