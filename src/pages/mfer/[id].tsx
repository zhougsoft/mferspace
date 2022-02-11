import React from 'react';

import { parseAuthCookie } from '../../services/auth.service';
import { getMfer } from '../../services/mfer.service';
import { getProfile } from '../../services/profile.service';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import AttributesCard from '../../components/AttributesCard';
import BlurbSection from '../../components/BlurbSection';

const ProfilePage: React.FC = ({
	loggedInAddress,
	mfer,
	profile,
	error,
}: any) => {
	if (error) return <h1>server error - check server console</h1>;
	if (!mfer) return <h1>no mfer... server error! pls report lol</h1>;

	return (
		<Layout
			title={`${mfer.name} | mferspace`}
			loggedInAddress={loggedInAddress}
		>
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

export const getServerSideProps = async ({ req, res, query: { id } }: any) => {
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

		// Fetch mfer data from chain, and profile data from DB
		const [mfer, profile] = await Promise.all([
			getMfer(mferId),
			getProfile(mferId),
		]);

		const loggedInAddress = parseAuthCookie(req, res);
		return { props: { loggedInAddress, mfer, profile, error: false } };
	} catch (error) {
		console.error(error);
		return { props: { error: true } };
	}
};

export default ProfilePage;
