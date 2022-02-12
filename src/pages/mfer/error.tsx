import React from 'react';
import Link from 'next/link';
import { parseAuthCookie } from '../../services/auth.service';
import Layout from '../../components/Layout';
import { Container } from '../../components/Shared';

interface MferErrorPageProps {
	loggedInAddress?: string;
}

// TODO: clean up the <br/> layout when time permits lmao
const MferErrorPage: React.FC<MferErrorPageProps> = ({ loggedInAddress }) => {
	return (
		<Layout title={'uh oh! | mferspace'} loggedInAddress={loggedInAddress}>
			<Container>
				<h1>invalid mfer id</h1>
				<h3>a mfer id is a number between 0 and 10,020!</h3>
				<br />
				<small>
					here&apos;s an example URL for going to mfer #6969&apos;s mferspace:
				</small>
				<br />
				<code>https://mferspace.com/mfer/6969</code>
				<br />
				<br />
				<br />
				<small>
					here&apos;s an example URL for <em>editing</em> mfer #6969&apos;s
					mferspace:
				</small>
				<br />
				<code>https://mferspace.com/mfer/edit/6969</code>
				<br />
				<br />
				<br />
				<br />
				<Link href="/">
					<a>back home</a>
				</Link>
			</Container>
		</Layout>
	);
};

// Check auth cookie server side and return authenticated address if logged in
export const getServerSideProps = async ({ req, res }: any) => {
	const loggedInAddress = parseAuthCookie(req, res);
	return { props: loggedInAddress ? { loggedInAddress } : {} };
};

export default MferErrorPage;
