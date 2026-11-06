import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // postgres.js and bcryptjs are server only, keep them out of the client bundle.
  serverExternalPackages: ['postgres', 'bcryptjs'],
  // The repo root has other lockfiles, pin tracing to this folder.
  outputFileTracingRoot: process.cwd(),
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
