/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'yt3.ggpht.com',
                port: '',
            }
        ]
    }
}

module.exports = nextConfig
