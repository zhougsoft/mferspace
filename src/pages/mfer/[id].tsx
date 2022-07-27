import React, { useState, useEffect } from 'react';

import { getProfile } from '../../services/profile.service';
import { useWeb3, useMfers } from '../../hooks';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import AttributesCard from '../../components/AttributesCard';
import BioSection from '../../components/BioSection';
import EditProfilePortal from '../../components/EditProfilePortal';

const ProfilePage: React.FC = ({ mferId, profile, error }: any) => {
	const { provider, account } = useWeb3();
	const { getMfer, checkMferOwnership } = useMfers(provider);

	// TODO: type this as a mfer
	const [mfer, setMfer] = useState<any>();
	const [isMferOwner, setIsMferOwner] = useState<boolean>();

	// Fetch mfer data on page load
	useEffect(() => {
		if (mferId !== undefined) {
			// TODO: type as a mfer
			getMfer(mferId).then(async (result: any) => {
				setMfer(result);
			});
		}
	}, [mferId]);

	// Check if connected wallet owns mfer
	useEffect(() => {
		if (account && mferId !== undefined) {
			checkMferOwnership(mferId, account).then(result => {
				setIsMferOwner(result);
			});
		}
	}, [account, mferId]);

	if (error || isNaN(mferId))
		return <h1>server error - check backend console</h1>;
	if (!mfer) return <div>fetching mfer...</div>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
			<Container>
				<div style={{ display: 'flex' }}>
					<div>
						<ProfileCard mfer={mfer} profile={profile} />
						<AttributesCard attributes={mfer.attributes} />
						<BioSection
							name={mfer.name}
							bioOne={profile.bio_1}
							bioTwo={profile.bio_2}
						/>
					</div>

					{isMferOwner && (
						<EditProfilePortal mferId={mferId} profile={profile} />
					)}
				</div>
			</Container>
		</Layout>
	);
};

export const getServerSideProps = async ({ query: { id } }: any) => {
	try {
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
