// Importing env files here to validate on build
import "./src/env.mjs";
import "@blueskeet/auth/env.mjs";

const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@blueskeet/api", "@blueskeet/auth", "@blueskeet/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: [".NEXT_PUBLIC_IMAGEDOMAINS"],
  },
};

export default config;
