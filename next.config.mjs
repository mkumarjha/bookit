/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:3000/",
        DB_LOCAL_URI: process.env.DB_URL,
        DB_URI: process.env.DB_URL,

        CLOUDINARY_CLOUD_NAME : 'dga0r23ns', 
        CLOUDINARY_API_KEY: '596343239567965',
        CLOUDINARY_API_SECERET: 'iv0YKUfbDrXSkKuyUeRXLpeuD8Q',

        SMTP_HOST: "sandbox.smtp.mailtrap.io",
        SMTP_PORT: "2525",
        SMTP_USER: "eab36a8e92f68a",
        SMTP_PASSWORD: "",
        SMTP_FROM_EMAIL: "noreply@bookit.com",
        SMTP_FROM_NAME: "BookIT",

        NEXTAUTH_URL: "http://localhost:3000/",
        NEXTAUTH_SECRET: "SDLFWEELJRWLJRLKVJLJLDFJSLDFJWTERPTIPOIUOIUOYUY"
    },
    images: {
        domains: ["res.cloudinary.com"]
    }
};

export default nextConfig;
