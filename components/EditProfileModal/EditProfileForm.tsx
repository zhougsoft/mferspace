// TODO:
// replace react-hook-form with useRefs on inputs and Zod for validation

import { useForm, SubmitHandler } from 'react-hook-form'
import Profile, { ProfileMaxChars } from '../../interfaces/Profile'
import { isValidSoundcloudLink } from '../../utils'

const validateMediaField = (url: string) => {
  if (!isValidSoundcloudLink(url)) {
    return 'invalid Soundcloud link'
  }
  return true
}

interface EditProfileFormProps {
  profile: Profile
  onSave: SubmitHandler<Profile>
}

export default function EditProfileForm({
  profile,
  onSave,
}: EditProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>()

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <br />
      <br />
      {/* NAME */}
      <div>
        <label htmlFor="name">name </label>
        <input
          defaultValue={profile?.name || ''}
          placeholder="name"
          {...register('name', { maxLength: ProfileMaxChars.Name })}
          autoComplete="off"
        />
        {errors.name && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.Name} chars
          </span>
        )}
      </div>
      <br />

      {/* TAGLINE */}
      <div>
        <label htmlFor="tagline">tagline </label>
        <input
          defaultValue={profile?.tagline || ''}
          placeholder="tagline"
          {...register('tagline', { maxLength: ProfileMaxChars.Tagline })}
          autoComplete="off"
        />
        {errors.tagline && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.Tagline} chars
          </span>
        )}
      </div>

      {/* GENDER */}
      <div>
        <label htmlFor="gender">gender </label>
        <input
          defaultValue={profile?.gender || ''}
          placeholder="gender"
          {...register('gender', { maxLength: ProfileMaxChars.Gender })}
          autoComplete="off"
        />
        {errors.gender && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.Gender} chars
          </span>
        )}
      </div>

      {/* AGE */}
      <div>
        <label htmlFor="age">age </label>
        <input
          defaultValue={profile?.age || ''}
          placeholder="age"
          {...register('age', { maxLength: ProfileMaxChars.Age })}
          autoComplete="off"
        />
        {errors.age && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.Age} chars
          </span>
        )}
      </div>

      {/* LOCATION */}
      <div>
        <label htmlFor="location">location </label>
        <input
          defaultValue={profile?.location || ''}
          placeholder="location"
          {...register('location', { maxLength: ProfileMaxChars.Location })}
          autoComplete="off"
        />
        {errors.location && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.Location} chars
          </span>
        )}
      </div>

      {/* SONG URL */}
      <div>
        <label htmlFor="media_url">soundcloud song </label>
        <input
          defaultValue={profile?.media_url || ''}
          placeholder="media_url"
          {...register('media_url', {
            maxLength: ProfileMaxChars.MediaUrl,
            validate: (value: string | undefined) => {
              if (
                !value?.startsWith('https://soundcloud.com') ||
                !value?.startsWith('soundcloud.com')
              ) {
                return 'invalid soundcloud link'
              }
              return true
            },
          })}
          autoComplete="off"
        />
        {errors.media_url && (
          <span style={{ color: 'red' }}>invalid soundcloud link</span>
        )}
      </div>
      <br />

      {/* ABOUT ME */}
      <div>
        <label htmlFor="bio_about">about you</label>
        <br />
        <textarea
          defaultValue={profile?.bio_about || ''}
          placeholder="about you"
          {...register('bio_about', { maxLength: ProfileMaxChars.BioAbout })}
          autoComplete="off"
        />
        {errors.bio_about && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.BioAbout} chars
          </span>
        )}
      </div>
      <br />

      {/* MFERS I'D LIKE TO MEET */}
      <div>
        <label htmlFor="bio_meet">mfers you&apos;d like to meet</label>
        <br />
        <textarea
          defaultValue={profile?.bio_meet || ''}
          placeholder="mfers you'd like to meet"
          {...register('bio_meet', { maxLength: ProfileMaxChars.BioMeet })}
          autoComplete="off"
        />
        {errors.bio_meet && (
          <span style={{ color: 'red' }}>
            max length {ProfileMaxChars.BioMeet} chars
          </span>
        )}
      </div>
      <br />

      {/* BUTTON GROUP */}
      <div>
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </div>
    </form>
  )
}
