/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.tiktok.com https://lf16-tiktok-web.ttwstatic.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://api.worldbank.org https://api.gdeltproject.org https://open.er-api.com https://restcountries.com https://ghoapi.azureedge.net https://sdmx.oecd.org https://sdmx.fao.org https://datahub.itu.int https://databrowser.uis.unesco.org https://api.github.com https://ec2-52-1-168-42.compute-1.amazonaws.com https://cdn.jsdelivr.net https://www.tiktok.com",
            "frame-src 'self' https://www.tiktok.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; '),
        },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
};

module.exports = nextConfig;
