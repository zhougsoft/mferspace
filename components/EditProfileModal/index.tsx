import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { utils } from 'ethers'

import { useWeb3, useAuth } from '../../hooks'
import * as S from './styled'
import EditProfileForm from './EditProfileForm'

interface EditProfileModalProps {
  mferId: number
  profile: any
  onClose: Function
}

export default function EditProfileModal({
  mferId,
  profile,
  onClose,
}: EditProfileModalProps) {
  const router = useRouter()
  const { address } = useWeb3()
  const { session, signIn } = useAuth()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // watch conditions that enable user authentication
  useEffect(() => {
    if (
      address &&
      session?.address &&
      utils.getAddress(address) === utils.getAddress(session.address)
    ) {
      setIsAuthenticated(true)
    } else {
      if (isAuthenticated) {
        setIsAuthenticated(false)
      }
    }
  }, [address, session?.address])

  // send request to edit profile data passed by form
  const onSave = async (fields: any) => {
    if (!isAuthenticated) {
      await signIn()
    }

    setIsSaving(true)

    const body = JSON.stringify({ mfer_id: mferId, ...fields })
    const editReqEndpoint = '/api/profile/edit'
    const editReqOpts = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }

    fetch(editReqEndpoint, editReqOpts)
      .then(async result => {
        // on success, reload the page to display updated data
        if (result.ok) {
          setIsSaving(false)
          onClose()
          router.reload()
        } else {
          // if unauthorized, prompt for login and re-submit
          if (result.status === 403) {
            try {
              await signIn()
              const reFetchResult = await fetch(editReqEndpoint, editReqOpts)
              if (reFetchResult.ok) {
                router.reload()
              } else {
                alert(
                  'profile edit unsuccessful - try refreshing the page in your browser!'
                )
                setIsSaving(false)
                onClose()
              }
            } catch (error) {
              console.error(error)
              onClose()
              setIsSaving(false)
            }
          }
        }
      })
      .catch(error => {
        console.error(error)
        onClose()
        setIsSaving(false)
      })
  }

  if (isSaving)
    return (
      <S.ModalWrapper>
        <div style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>
          saving
        </div>
      </S.ModalWrapper>
    )

  return (
    <S.ModalWrapper>
      <button onClick={() => onClose()}>cancel</button>
      <br />
      <br />
      <br />
      <EditProfileForm profile={profile} onSave={onSave} />
    </S.ModalWrapper>
  )
}
