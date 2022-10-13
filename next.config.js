/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.picsum.photos", "upload.wikimedia.org", "res.cloudinary.com"],
  },
  env: {
    CLOUDINARY_CLOUD: "https://api.cloudinary.com/v1_1/doxgf1mhn/image/upload",
    PRODUCT_DEFAULT_IMAGE: "/assets/default.png",
  },
};

module.exports = nextConfig;
