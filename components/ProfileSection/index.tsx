import Image from 'next/image'
import { Mfer, Profile } from '../../interfaces'
import * as S from './styled'

interface ProfileSectionProps {
  mfer: Mfer
  profile: Profile
}

export default function ProfileSection({ mfer, profile }: ProfileSectionProps) {
  return (
    <S.Section>
      <h2>{profile.name || 'an mfer'}</h2>

      <S.ProfileDisplay>
        <div className="img-wrapper">
          <Image
            src={mfer.img}
            alt={`mfer #${mfer.id}`}
            width={300}
            height={300}
          />
        </div>

        <div>
          <strong>mfer #{mfer.id}</strong>
          <br />
          <br />
          <span>
            <em>{`"${profile.tagline || '=)'}"`}</em>
          </span>
          <br />
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.15rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>{profile.age}</li>
            <li style={{ marginBottom: '0.5rem' }}>{profile.gender}</li>
            <li>{profile.location}</li>
          </ul>
        </div>
      </S.ProfileDisplay>
    </S.Section>
  )
}
