import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/f/**', // Specifically match file URLs
      },
      { hostname: 'img.clerk.com'},
      
    ]
  }
};

export default nextConfig;
