/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["DB"],
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
};

export default nextConfig;
