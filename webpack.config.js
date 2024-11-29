import path from 'path'; // Use ES module import for path

export default {
  // other Webpack configurations...
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // adjust as necessary
    fallback: {
      path: require.resolve('path-browserify'), // Polyfill for 'path' module
      fs: false, // Exclude 'fs' module for the browser
      os: require.resolve('os-browserify/browser'), // Exclude 'os' module for the browser
      "crypto": require.resolve("crypto-browserify"),
      util: require.resolve('util/'), // Polyfill for 'util' module if needed
    },
  },
  // other configurations...
};
