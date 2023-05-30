// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/dashboards/dashboard",
//         permanent: true,
//       },
//     ];
//   },
// };

module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    hostname: ["lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
    loader: "akamai",
    path: "/",
    unoptimized: true,
  },
};
