import React, { useState, useEffect } from 'react';

import { getProfile } from '../../services/profile.service';
import { useWeb3, useMfers } from '../../hooks';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import AttributesCard from '../../components/AttributesCard';
import BioSection from '../../components/BioSection';
import EditProfileModal from '../../components/EditProfileModal';

const ProfilePage: React.FC = ({ mferId, profile, error }: any) => {
	const { provider, account } = useWeb3();
	const { getMfer, checkMferOwnership } = useMfers(provider);

	// TODO: type this as a mfer
	const [mfer, setMfer] = useState<any>();
	const [isMferOwner, setIsMferOwner] = useState<boolean>();
	const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>();

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

	const onEditProfileClick = () => {
		setEditModalIsOpen(true);
	};

	const onEditModalClose = () => {
		setEditModalIsOpen(false);
	};

	if (error || isNaN(mferId))
		return <h1>server error - check backend console</h1>;
	if (!mfer) return <div>fetching mfer...</div>;

	return (
		<Layout title={`${mfer.name} | mferspace`}>
			<Container style={{ marginTop: '1rem' }}>
				{isMferOwner && !editModalIsOpen && (
					<button
						onClick={onEditProfileClick}
						style={{ marginBottom: '0.5rem' }}
					>
						edit profile
					</button>
				)}
				<div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
					<div style={{ marginRight: '4rem' }}>
						<ProfileCard mfer={mfer} profile={profile} />
						<AttributesCard attributes={mfer.attributes} />
					</div>
					<BioSection
						name={mfer.name}
						bioOne={profile.bio_1}
						bioTwo={profile.bio_2}
					/>

					{editModalIsOpen && (
						<EditProfileModal
							mferId={mferId}
							profile={profile}
							onClose={onEditModalClose}
						/>
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
