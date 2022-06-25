import Image from 'next/image';

import { Mfer } from '../../types';
import * as S from './styled';

interface ProfileCardProps {
	mfer: Mfer;
	profile: any; // TODO: type
}

const ProfileCard: React.FC<ProfileCardProps> = ({ mfer, profile }) => (
	<S.Section>
		<S.ProfilePicDisplay>
			<h2>{mfer.name}</h2>
			<div className="img-wrapper">
				<Image src={mfer.img} alt={mfer.name} width="200px" height="200px" />
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
);

export default ProfileCard;
