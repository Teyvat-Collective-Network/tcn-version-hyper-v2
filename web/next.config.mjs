/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "i.imgur.com" },
            { protocol: "https", hostname: "genshinwizard.com" },
        ],
    },
};

export default nextConfig;
