/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // WARNING: This allows any origin to access your dev server.
    // This is insecure and should NOT be used in production.
    allowedDevOrigins: ["*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hobbysense.ca',
        port: '',
        pathname: '/cdn/shop/files/**',
      },
      {
        protocol: 'https',
        hostname: 'carrera-revell-toys.com',
        port: '',
        pathname: '/cdn/shop/products/**',
      },
    ],
  },
};

export default nextConfig;