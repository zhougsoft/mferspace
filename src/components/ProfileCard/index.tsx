import Image from 'next/image';
import Link from 'next/link';

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
			<div>{`"${profile?.tagline || ':-)'}"`}</div>
			<ul>
				<li>{profile?.pronouns}</li>
				<li>{profile?.age}</li>
				<li>{profile?.location}</li>
			</ul>
			<div className="social-links">[yr coolest link here]</div>
			<div className="update-msg">
				<IconEmoji alt="Hand pointing up">☝️</IconEmoji> own this mfer?{' '}
				<Link href={`/mfer/edit/${mfer.id}`}>
					<a>edit this profile!</a>
				</Link>
			</div>
		</S.ProfileInfo>
	</S.Section>
);

export default ProfileCard;
