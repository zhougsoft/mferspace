// TODO:
// replace react-hook-form with useRefs on inputs and Zod for validation

import { useForm, SubmitHandler } from 'react-hook-form'
import Profile, { ProfileMaxChars } from '../../interfaces/Profile'

interface EditProfileFormProps {
  profile: any // TODO: type this
  onSave: SubmitHandler<Profile> // type the data
}

export default function EditProfileForm({
  profile,
  onSave,
}: EditProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

  return (
    <form onSubmit={handleSubmit(onSave)}>
      {/* NAME */}
      <div>
        <label htmlFor="name">name</label>
        <input
          defaultValue={profile?.name || ''}
          placeholder="name"
          {...register('name', { maxLength: ProfileMaxChars.Name })}
          autoComplete="off"
        />
        {errors.name && <span>max length {ProfileMaxChars.Name} chars</span>}
      </div>

      {/* TAGLINE */}
      <div>
        <label htmlFor="tagline">tagline</label>
        <input
          defaultValue={profile?.tagline || ''}
          placeholder="tagline"
          {...register('tagline', { maxLength: ProfileMaxChars.Tagline })}
          autoComplete="off"
        />
        {errors.tagline && (
          <span>max length {ProfileMaxChars.Tagline} chars</span>
        )}
      </div>

      {/* GENDER */}
      <div>
        <label htmlFor="gender">gender</label>
        <input
          defaultValue={profile?.gender || ''}
          placeholder="gender"
          {...register('gender', { maxLength: ProfileMaxChars.Gender })}
          autoComplete="off"
        />
        {errors.gender && (
          <span>max length {ProfileMaxChars.Gender} chars</span>
        )}
      </div>

      {/* AGE */}
      <div>
        <label htmlFor="age">age</label>
        <input
          defaultValue={profile?.age || ''}
          placeholder="age"
          {...register('age', { maxLength: ProfileMaxChars.Age })}
          autoComplete="off"
        />
        {errors.age && <span>max length {ProfileMaxChars.Age} chars</span>}
      </div>

      {/* LOCATION */}
      <div>
        <label htmlFor="location">location</label>
        <input
          defaultValue={profile?.location || ''}
          placeholder="location"
          {...register('location', { maxLength: ProfileMaxChars.Location })}
          autoComplete="off"
        />
        {errors.location && (
          <span>max length {ProfileMaxChars.Location} chars</span>
        )}
      </div>

      {/* SONG URL */}
      <div>
        <label htmlFor="song_url">song_url</label>
        <input
          defaultValue={profile?.song_url || ''}
          placeholder="song_url"
          {...register('song_url', { maxLength: ProfileMaxChars.SongUrl })}
          autoComplete="off"
        />
        {errors.song_url && (
          <span>max length {ProfileMaxChars.SongUrl} chars</span>
        )}
      </div>

      {/* ABOUT ME */}
      <div>
        <label htmlFor="bio_about">about you</label>
        <textarea
          defaultValue={profile?.bio_about || ''}
          placeholder="about you"
          {...register('bio_about', { maxLength: ProfileMaxChars.BioAbout })}
          autoComplete="off"
        />
        {errors.bio_about && (
          <span>max length {ProfileMaxChars.BioAbout} chars</span>
        )}
      </div>

      {/* MFERS I'D LIKE TO MEET */}
      <div>
        <label htmlFor="bio_meet">mfers you&apos;d like to meet</label>
        <textarea
          defaultValue={profile?.bio_meet || ''}
          placeholder="mfers you'd like to meet"
          {...register('bio_meet', { maxLength: ProfileMaxChars.BioMeet })}
          autoComplete="off"
        />
        {errors.bio_meet && (
          <span>max length {ProfileMaxChars.BioMeet} chars</span>
        )}
      </div>

      {/* BUTTON GROUP */}
      <div>
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </div>
    </form>
  )
}
