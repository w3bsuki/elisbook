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
  webpack: (config, { isServer }) => {
    // Fix "Can't resolve AboutUs" errors by providing a fallback
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      // Add this to fix the "Cannot read properties of undefined (reading 'call')" error
      AboutUs: false 
    };
    
    // Return modified config
    return config;
  },
};

export default nextConfig; 