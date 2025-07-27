import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // WARNING: This allows any origin to access your dev server.
    // This is insecure and should NOT be used in production.
    allowedDevOrigins: ["*"],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hobbysense.ca' },
      { protocol: 'https', hostname: 'carrera-revell-toys.com' },
      { protocol: 'https', hostname: 'bchobbies.com' },
      { protocol: 'https', hostname: 'imperialhobbies.ca' },
      { protocol: 'https', hostname: 'cdn11.bigcommerce.com' },
      { protocol: 'https', hostname: 'www.autoworldstore.com' },
      { protocol: 'https', hostname: 'www.megahobby.com' },
      { protocol: 'https', hostname: 'www.tamiyausa.com' },
      { protocol: 'https', hostname: 'www.sunwardhobbies.ca' },
      { protocol: 'https', hostname: 'agesthreeandup.ca' },
      { protocol: 'https', hostname: 'spraygunner.com' },
      { protocol: 'https', hostname: 'ak-interactive.com' },
      { protocol: 'https', hostname: 'hobbyheaven.org' },
      { protocol: 'https', hostname: 'newtype.us' },
      { protocol: 'https', hostname: 'argamahobby.com' },
      { protocol: 'https', hostname: 'example.com' }, // Placeholder images
    ],
  },
};

export default nextConfig;