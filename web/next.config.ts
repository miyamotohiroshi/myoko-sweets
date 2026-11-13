import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Xserver に置くため、ビルドで全ページを HTML として out/ に書き出す
  output: 'export',
  // /shop/xxx/ → /shop/xxx/index.html の形で書き出す（Apache でそのまま開ける）
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // 静的書き出しでは画像の自動変換が使えないため、元の画像をそのまま表示
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.myoko-sweets.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
