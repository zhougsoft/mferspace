import React, { useState, useEffect, useMemo } from 'react'

import type { Profile, Mfer } from '../../interfaces'
import { read as readProfile } from '../../services/profiles'
import { useWeb3, useMfers } from '../../hooks'
import { isValidMferId } from '../../utils'
import theme from '../../styles/theme'

import { Container, IconEmoji } from '../../components/Shared'
import Layout from '../../components/Layout'
import ProfileSection from '../../components/ProfileSection'
import SoundCloudEmbed from '../../components/SoundCloudEmbed'
import TraitsSection from '../../components/TraitsSection'
import BioSection from '../../components/BioSection'
import TwitterTimeline from '../../components/TwitterTimeline'
import EditProfileModal from '../../components/EditProfileModal'

interface ProfilePageProps {
  mferId: number
  profile: Profile
  error?: any
}

// fetch & return profile by profile id from database
export async function getServerSideProps({ query: { id } }: any) {
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

    const profile = await readProfile(id)
    const props: ProfilePageProps = { mferId: id, profile, error: false }
    return { props }
  } catch (error) {
    console.error(error)
    return { props: { error: true } }
  }
}

export default function ProfilePage({
  mferId,
  profile,
  error,
}: ProfilePageProps) {
  const { address } = useWeb3()
  const { getMfer, checkMferOwnership } = useMfers()

  const [isMferOwner, setIsMferOwner] = useState<boolean>()
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>()

  const mfer: Mfer = useMemo(() => getMfer(mferId), [mferId])

  // Check if connected wallet owns mfer
  useEffect(() => {
    if (address && mferId !== undefined) {
      checkMferOwnership(mferId, address).then((result: any) => {
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
        server error
      </h1>
    )
  if (!mfer) return <div>fetching mfer...</div>

  return (
    <Layout title={`${profile.name} | mferspace`}>
      <Container style={{ marginTop: '1rem' }}>
        {/* --- edit profile button --- --- */}
        {isMferOwner && (
          <button
            // TODO: remove maintence alert when ready
            // onClick={onEditProfileClick}
            onClick={() =>
              alert(
                '\n\n♥ 𝘂𝗻𝗱𝗲𝗿 𝗺𝗮𝗶𝗻𝘁𝗲𝗻𝗮𝗻𝗰𝗲 ♥\nfollow @𝘇𝗵𝗼𝘂𝗴𝟬𝘅 on twitter for updates!\n'
              )
            }
            disabled={editModalIsOpen}
            style={{ marginBottom: '0.5rem' }}>
            <IconEmoji emoji="✎" alt="pencil edit icon" />
            <em>edit profile</em>
          </button>
        )}
        {/* --- PROFILE CONTENT WRAPPER--- */}
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
          {/* --- LEFT COLUMN--- */}
          <div style={{ marginRight: '3rem' }}>
            {/* --- profile card --- */}
            <ProfileSection mfer={mfer} profile={profile} />

            {/* --- profile url display --- */}
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
                {`https://dev.mferspace.com/mfer/${mferId}`}
              </pre>
            </div>

            {/* --- soundcloud embed --- */}
            {profile?.media_url && (
              <>
                <SoundCloudEmbed
                  url={profile.media_url}
                  width="25rem"
                  height={150}
                />
                <br />
              </>
            )}

            {/* --- traits --- */}
            <TraitsSection traits={mfer.traits} />
          </div>

          {/* --- RIGHT COLUMN--- */}
          <div style={{ width: '26rem' }}>
            {/* --- bio --- */}
            <BioSection
              name={profile?.name}
              bioAbout={profile?.bio_about}
              bioMeet={profile?.bio_meet}
            />

            {/* --- twitter timeline embed --- */}
            {profile?.twitter && (
              <>
                <hr />
                <TwitterTimeline username={profile.twitter} height={600} />
              </>
            )}
          </div>

          {/* --- edit modal --- */}
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
