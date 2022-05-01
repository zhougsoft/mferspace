import React from 'react';
import Link from 'next/link';

import * as S from './styled';
import {
	Container,
	ExtLink,
	GithubIcon,
	IconEmoji,
} from '../../components/Shared';

const LandingPage: React.FC = () => {
	return (
		<Container>
			<S.Heading>
				<h1>mferspace</h1>
				<div>
					<h3>a (future) space for mfers</h3>
					<ExtLink href="https://github.com/zhoug0x/mferspace">
						<GithubIcon />
					</ExtLink>
				</div>
			</S.Heading>

			<S.InfoSection>
				<p>
					<strong>gm,</strong>
					<br />
					<br />
					<strong>mferspace</strong> is a work-in-progress by{' '}
					<ExtLink href="https://twitter.com/zhoug0x">zhoug</ExtLink>
					<br />
					in partnership with the{' '}
					<ExtLink href="https://unofficialmfers.com">
						unofficial mfers
					</ExtLink>{' '}
					frenz
				</p>

				<small>
					interested in getting a mfer for yrself?{' '}
					<strong>
						grab one{' '}
						<ExtLink href="https://opensea.io/collection/mfers">
							here on opensea
						</ExtLink>
						!
					</strong>
				</small>
			</S.InfoSection>

			<S.ExampleSection>
				<h4>check out yr mfin profile!</h4>
				<pre>
					<IconEmoji emoji={'👉'} alt="Hand pointing right" />{' '}
					mferspace.com/mfer/[yr mfer id]
				</pre>
				<Link href="/mfer/3191">an example mfer</Link>
			</S.ExampleSection>
		</Container>
	);
};

export default LandingPage;
