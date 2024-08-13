/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_LOCAL_URI: process.env.DB_URL,
        DB_URI: process.env.DB_URL
    }
};

export default nextConfig;
