import Image from 'next/image';

import { Mfer } from '../../types';
import * as S from './styled';
import { IconEmoji } from '../Shared';

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
			<div>{`"${profile.tagline}"`}</div>
			<ul>
				<li>{profile.pronouns}</li>
				<li>{profile.age}</li>
				<li>{profile.location}</li>
			</ul>
			<div className="social-links">[yr fav links here]</div>
			<div className="update-msg">
				<IconEmoji alt="Hand pointing up">☝️</IconEmoji> editable in future
				updates!
			</div>
		</S.ProfileInfo>
	</S.Section>
);

export default ProfileCard;
