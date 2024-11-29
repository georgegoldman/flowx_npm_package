import path from 'path'; // ES module import

export default {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // adjust as necessary
    fallback: {
      path: require.resolve('path-browserify'), // Use require.resolve for static resolution
      fs: false, // Exclude fs module for the browser
      os: require.resolve('os-browserify/browser'), // Use os-browserify for os module
      crypto: require.resolve('crypto-browserify'), // Use crypto-browserify for crypto module
      util: require.resolve('util/'), // Polyfill for 'util' module if needed
    },
  },
};
