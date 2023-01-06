import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks'
import EditProfileForm from './EditProfileForm'
import * as S from './styled'

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
  const { signIn } = useAuth()
  const [isSaving, setIsSaving] = useState<boolean>(false)

  // TODO: can this profile editing plumbing live in a useProfiles() hook?
  // send request to edit profile data passed by form
  const onSave = async (fields: any) => {
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
          router.reload()
        } else {
          // if unauthorized, prompt for login and re-submit
          if (result.status === 400) {
            onClose()
            setIsSaving(false)
            alert('bad request data')
          }

          if (result.status === 403) {
            try {
              await signIn()
              const reFetchResult = await fetch(editReqEndpoint, editReqOpts)
              if (reFetchResult.ok) {
                router.reload()
              } else {
                alert('profile edit unsuccessful')
              }
            } catch (error) {
              console.error(error)
            } finally {
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <EditProfileForm profile={profile} onSave={onSave} />
        <small style={{ paddingLeft: '2rem', lineHeight: '1.25rem' }}>
          sorry for literally the jankiest form ever lol im busy AF with the
          backend - imp0ster has some code coming to tidy this up, cheers!
          <br />
          <br />- zhoug {'<3'}
        </small>
      </div>
    </S.ModalWrapper>
  )
}
