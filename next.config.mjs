/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          publicPath: `/_next/static/sounds/`,
          outputPath: `${isServer ? "../" : ""}static/sounds/`,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
