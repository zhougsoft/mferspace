interface ProfileShowcaseProps {
	name: string;
	img: string;
}

const ProfileShowcase: React.FC<ProfileShowcaseProps> = ({ name, img }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ marginRight: '2rem' }}>
			<h2 style={{ margin: '0' }}>{name}</h2>
			<img
				src={img}
				alt={name}
				style={{ width: '100px', margin: '2.5rem 0' }}
			/>

			<br />
			<br />
			<br />
			<div>View My:</div>
			<div>Pics | Videos</div>
		</div>

		<div>
			<br />
			<br />
			<div>"It's all about me!!"</div>

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

export default ProfileShowcase;
