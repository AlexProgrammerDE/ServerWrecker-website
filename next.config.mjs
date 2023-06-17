import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    staticImage: true,
    latex: true,
    defaultShowCopyCode: true
})

const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; connect-src 'self' https://discord.com; font-src 'self'; frame-src 'self'; img-src 'self' data: https://avatars.githubusercontent.com; manifest-src 'self'; media-src 'self'; worker-src 'self';"
    }
]

export default withNextra({
    reactStrictMode: true,
    redirects: async () => {
        return [
            {
                source: '/discord',
                destination: process.env.NEXT_PUBLIC_DISCORD_LINK,
                permanent: false,
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders
            }
        ]
    },
    images: {
        unoptimized: true
    }
})
