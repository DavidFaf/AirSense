const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Create a proxy for flask API to prevent CORS issues
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:5000/:path*`,
      },
    ];
  },
};

export default nextConfig;
