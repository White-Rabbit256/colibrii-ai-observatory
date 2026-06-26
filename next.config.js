/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['recharts', 'framer-motion', 'react-simple-maps', 'three', 'react-globe.gl', 'animejs', '@react-three/fiber', '@react-three/postprocessing'],
  },
  async headers() {
    return [
    {
      source: '/(.*)\\.(js|css|woff2|woff|ttf|ico|svg|png|jpg|jpeg|webp|avif)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.tiktok.com https://lf16-tiktok-web.ttwstatic.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https: blob:",
            "connect-src 'self' https://api.worldbank.org https://api.gdeltproject.org https://open.er-api.com https://restcountries.com https://ghoapi.azureedge.net https://sdmx.oecd.org https://sdmx.fao.org https://datahub.itu.int https://databrowser.uis.unesco.org https://api.github.com https://cdn.jsdelivr.net https://www.tiktok.com https://services.nvd.nist.gov https://va.vercel-scripts.com https://vitals.vercel-insights.com",
            // worker-src added for WRI CSV parse Web Worker (Phase 1)
            "worker-src 'self' blob:",
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
  webpack(config) {
    config.optimization.splitChunks = {
      ...(config.optimization.splitChunks || {}),
      cacheGroups: {
        ...((config.optimization.splitChunks && config.optimization.splitChunks.cacheGroups) || {}),
        globeGl: {
          test: /[\\/]node_modules[\\/](react-globe\.gl|globe\.gl|three-render-objects)[\\/]/,
          name: 'chunk-globe-gl',
          chunks: 'async',
          priority: 30,
          enforce: true,
        },
      },
    };
    return config;
  },
};

module.exports = nextConfig;
