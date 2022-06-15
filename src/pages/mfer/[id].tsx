import React from 'react';

import { parseAuthCookie } from '../../services/auth.service';
import { getMfer } from '../../services/mfer.service';
import { getProfile } from '../../services/profile.service';

import { Container } from '../../components/Shared';
import Layout from '../../components/Layout';
import ProfileCard from '../../components/ProfileCard';
import AttributesCard from '../../components/AttributesCard';
import BlurbSection from '../../components/BlurbSection';



// TODO: overhaul the mfer fetching!
// don't fetch the mfer data on server, fetch from client on page load

// ON SERVER:
// fetching for auth state (cookie)
// fetch the profile data

// also...
// TODO: remove EDIT page & route entirely, just make this page flip to "EDIT" mode with editable fields



const ProfilePage: React.FC = ({ mfer, profile, error }: any) => {
	if (error) return <h1>server error - check server console</h1>;
	if (!mfer) return <h1>no mfer... server error! pls report lol</h1>;

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

		const activeAddress = parseAuthCookie(req, res);
		return { props: { activeAddress, mfer, profile, error: false } };
	} catch (error) {
		console.log(error);
		return { props: { error: true } };
	}
};

export default ProfilePage;
