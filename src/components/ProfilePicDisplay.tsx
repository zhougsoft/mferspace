import Image from 'next/image';
import { IconEmoji } from '../components/Shared';

interface ProfilePicDisplayProps {
	name: string;
	img: string;
}

const ProfilePicDisplay: React.FC<ProfilePicDisplayProps> = ({
	name = 'this mfer',
	img = '',
}) => (
	<section style={{ display: 'flex' }}>
		<div style={{ marginRight: '2rem' }}>
			<h2 style={{ margin: '0' }}>{name}</h2>
			<div style={{ margin: '2.5rem 0' }}>
				<Image src={img} alt={name} width="200px" height="200px" />
			</div>
		</div>
		<div style={{ alignSelf: 'center' }}>
			<div>{'":-)"'}</div>
			<ul style={{ listStyle: 'none', padding: '0' }}>
				<li style={{ color: '#999' }}>p-nouns</li>
				<li style={{ color: '#999' }}>X yrs old</li>
				<li style={{ color: '#999' }}>Santa Monica, CALIFORNIA</li>
				<li style={{ color: '#999' }}>United States</li>
			</ul>
			<div style={{ color: '#999' }}>[other socials here]</div>
			<div style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
				<IconEmoji alt="Hand pointing up">☝️</IconEmoji> editable in future
				updates!
			</div>
		</div>
	</section>
);

export default ProfilePicDisplay;
