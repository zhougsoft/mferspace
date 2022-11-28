import Image from 'next/image'

import { Mfer } from '../../interfaces'
import * as S from './styled'

interface ProfileCardProps {
  mfer: Mfer
  profile: any // TODO: type
}

export default function ProfileCard({ mfer, profile }: ProfileCardProps) {
  return (
    <S.Section>
      <S.ProfilePicDisplay>
        <h2>{mfer.name}</h2>
        <div className="img-wrapper">
          <Image src={mfer.img} alt={mfer.name} width={200} height={200} />
        </div>
      </S.ProfilePicDisplay>
      <S.ProfileInfo>
        <div>
          <strong>{profile?.name || 'some mfer'}</strong>
        </div>
        <div>{`"${profile?.tagline || ':-)'}"`}</div>
        <ul>
          <li>{profile?.age}</li>
          <li>{profile?.pronouns}</li>
          <li>{profile?.location}</li>
        </ul>
      </S.ProfileInfo>
    </S.Section>
  )
}
