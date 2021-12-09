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
				<Image src={img} alt={name} width="100px" height="100px" />
			</div>
			<br />
			<br />
			<br />
			<div>View My:</div>
			<div>Pics | Videos</div>
		</div>
		<div>
			<br />
			<br />
			<div>&quot;It&apos;s all about me!!&quot;</div>
			<br />
			<ul style={{ listStyle: 'none', padding: '0' }}>
				<li>Female</li>
				<li>22 years old</li>
				<li>SAN FRANCISCO, CALIFORNIA</li>
				<li>United States</li>
			</ul>
			<br />
			<div>Online Now!</div>
			<br />
			<div>Last Login: 10/10/2007</div>
		</div>
	</div>
);

export default ProfilePicDisplay;
