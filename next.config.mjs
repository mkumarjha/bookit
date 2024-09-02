/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:3000/",
        DB_LOCAL_URI: process.env.DB_URL,
        DB_URI: process.env.DB_URL
    },
    images: {
        domains: ["res.cloudinary.com"]
    }
};

export default nextConfig;
