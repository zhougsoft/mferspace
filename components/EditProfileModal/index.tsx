import { useState } from 'react'
import { useRouter } from 'next/router'

import { EditProfileFields } from '../../interfaces'
// import { useWeb3, useAuth } from '../../hooks';

import * as S from './styled'
import EditProfileForm from './EditProfileForm'

interface EditProfileModalProps {
  mferId: number
  profile: any
  onClose: Function
}

// TODO: type this (and profile) properly
export default function EditProfileModal({
  mferId,
  profile,
  onClose,
}: EditProfileModalProps) {
  const router = useRouter()
  // const { getSigner } = useWeb3();
  // const { login } = useAuth();

  const [isSaving, setIsSaving] = useState<boolean>(false)

  // Sends post req to edit profile data passed by form
  const onSave = (fields: EditProfileFields) => {
    setIsSaving(true)

    const body = JSON.stringify({ mfer_id: mferId, ...fields })

    const editReqEndpoint = '/api/profile/edit'
    const editReqOpts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }

    fetch(editReqEndpoint, editReqOpts)
      .then(async result => {
        // on success, reload the page to display updated data
        if (result.ok) {
          router.reload()
        } else {
          // if unauthorized, prompt for login and re-submit
          if (result.status === 403) {
            try {
              // TODO: address this somehow
              // await login(getSigner());

              const reFetchResult = await fetch(editReqEndpoint, editReqOpts)
              if (reFetchResult.ok) {
                router.reload()
              } else {
                alert('profile edit unsuccessful...')
                setIsSaving(false)
              }
            } catch (error) {
              console.error(error)
            }
          }
        }
      })
      .catch(error => {
        console.error(error)
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
