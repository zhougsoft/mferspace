import React, { useState, useEffect } from 'react';

import { parseAuthCookie } from '../../services/auth.service';
import { getProfile } from '../../services/profile.service';
import { useWeb3, useMfers } from '../../hooks';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import AttributesCard from '../../components/AttributesCard';
import BlurbSection from '../../components/BlurbSection';



// TODO: add flag prop to check if connected wallet is the holder of the current mfer
// *** remove EDIT page & route entirely, just make this page flip to "EDIT" mode with editable fields



const ProfilePage: React.FC = ({ mferId, profile, error }: any) => {
	const { provider } = useWeb3();
	const { getMfer } = useMfers(provider);

	const [mfer, setMfer] = useState<any>();

	useEffect(() => {
		if (mferId !== undefined) {
			getMfer(mferId).then(result => {
				setMfer(result);
			});
		}
	}, [mferId]);

	if (error || mferId === undefined)
		return <h1>server error - check backend console</h1>;
	if (!mfer) return <>loading...</>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
			<Container>
				<div style={{ display: 'flex' }}>
					<div>
						<ProfileCard mfer={mfer} profile={profile} />
						<AttributesCard attributes={mfer.attributes} />
						<BlurbSection name={mfer.name} />
					</div>
				</div>
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
		// TODO: this is duped in './edit/[id].tsx'
		// Validate mfer id (mfer ids can range from 0 to 10020)
		const mferId = parseInt(id);

		if (isNaN(mferId) || mferId < 0 || mferId > 10020) {
			return {
				redirect: {
					permanent: false,
					destination: '/mfer/error',
				},
			};
		}

		// Fetch profile data from DB
		const profile = await getProfile(mferId);

		return { props: { mferId, profile, error: false } };
	} catch (error) {
		console.log(error);
		return { props: { error: true } };
	}
};

export default ProfilePage;
