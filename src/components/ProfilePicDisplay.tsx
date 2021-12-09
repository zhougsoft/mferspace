import Image from 'next/image';

interface ProfilePicDisplayProps {
	name: string;
	img: string;
}

const ProfilePicDisplay: React.FC<ProfilePicDisplayProps> = ({ name, img }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '2rem' }}>
			<h2 style={{ margin: '0' }}>{name}</h2>
			<div style={{ margin: '2.5rem 0' }}>
				<Image src={img} alt={name} width="200px" height="200px" />
			</div>
		</div>
		<div style={{ alignSelf: 'center' }}>
			<div>&quot;This is where your tagline goes!!&quot;</div>
			<ul style={{ listStyle: 'none', padding: '0' }}>
				<li>n years old</li>
				<li>she/her</li>
				<li>SAN FRANCISCO, CALIFORNIA</li>
			</ul>
			<div>[social links...]</div>
		</div>
	</div>
);

export default ProfilePicDisplay;
