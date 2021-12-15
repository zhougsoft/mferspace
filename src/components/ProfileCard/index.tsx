import Image from 'next/image';

import * as S from './styled';
import { IconEmoji } from '../Shared';

interface ProfileCardProps {
	name: string;
	img: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
	name = 'this mfer',
	img = '',
}) => (
	<S.Section>
		<S.ProfilePicDisplay>
			<h2>{name}</h2>
			<div className="img-wrapper">
				<Image src={img} alt={name} width="200px" height="200px" />
			</div>
		</S.ProfilePicDisplay>
		<S.ProfileInfo>
			<div>{'":-)"'}</div>
			<ul>
				<li>p-nouns</li>
				<li>X yrs old</li>
				<li>Santa Monica, CALIFORNIA</li>
				<li>United States</li>
			</ul>
			<div className="social-links">[other socials here]</div>
			<div className="update-msg">
				<IconEmoji alt="Hand pointing up">☝️</IconEmoji> editable in future
				updates!
			</div>
		</S.ProfileInfo>
	</S.Section>
);

export default ProfileCard;
