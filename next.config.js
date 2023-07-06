/** @type {import('next').NextConfig} */
// const nextConfig = {
// };

// TRY ADDING CONFIG TO TURN SVG INTO COMPONENTS
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;

// module.exports = {
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/i,
//         // issuer: /\.[jt]sx?$/,
//         use: [
//                 {
//                   loader: "@svgr/webpack",
//                   options: {
//                     native: true,
//                   },
//                 },
//               ],
//       })
//       return config
//     },
//   }

