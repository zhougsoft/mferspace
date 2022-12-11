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
      <S.ProfilePicDisplay>
        <h2>{mfer.name}</h2>
        <div className="img-wrapper">
          <Image src={mfer.img} alt={mfer.name} width={300} height={300} />
        </div>
      </S.ProfilePicDisplay>
      <S.ProfileInfo>
        <div>
          <strong>{profile.name || 'some mfer'}</strong>
        </div>
        <div>
          <em>{`"${profile.tagline || ':-)'}"`}</em>
        </div>
        <br />
        <ul style={{ fontSize: '0.9rem', lineHeight: '1.15rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>{profile.age}</li>
          <li style={{ marginBottom: '0.5rem' }}>{profile.gender}</li>
          <li>{profile.location}</li>
        </ul>
      </S.ProfileInfo>
    </S.Section>
  )
}
