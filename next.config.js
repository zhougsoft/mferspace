/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	env: {
		ETHEREUM_NODE_URL: process.env.ETHEREUM_NODE_URL || '',
	},
};
