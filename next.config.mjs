/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
				pathname: '/images/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'ufs.sh',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.ufs.sh',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
