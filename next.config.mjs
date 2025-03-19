/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shadcnblocks.com',
        pathname: '/**',
      },
    ],
  },
  distDir: '.next',
  trailingSlash: true,
  // This webpack configuration helps fix common module resolution issues
  webpack: (config, { dev, isServer }) => {
    // Fix module resolution issues
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    
    // This helps fix "Cannot read properties of undefined (reading 'call')" errors
    if (!isServer && !dev) {
      config.optimization.minimize = false;
    }
    
    return config;
  },
};

export default nextConfig; 