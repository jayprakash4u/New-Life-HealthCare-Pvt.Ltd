import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/services/lab-ultrasound',
        destination: '/services/laboratory',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
