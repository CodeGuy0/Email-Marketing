/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.beehiiv.com",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "aarambh.jklu.edu.in",
      },
      {
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
