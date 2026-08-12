/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Linting runs once, from the repository root, over the whole workspace.
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  // Workspace packages are TypeScript source; Next compiles them itself.
  transpilePackages: ['@astra/core', '@astra/db', '@astra/integrations'],
  experimental: {
    serverActions: { bodySizeLimit: '1mb' },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // The dashboard renders sanitized prospect HTML. The sanitizer is the
          // first defence; this policy is the second, and neither is trusted
          // on its own.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'none'",
              "object-src 'none'",
            ].join('; '),
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;
