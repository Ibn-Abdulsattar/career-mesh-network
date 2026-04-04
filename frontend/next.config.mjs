/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler: true,
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5050', // Match the port in your error
        pathname: '/upload/**',
      },
    ],
  },
};

export default nextConfig;
