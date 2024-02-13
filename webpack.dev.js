const TerserPlugin = require('terser-webpack-plugin');
// const WebpackObfuscator = require('webpack-obfuscator'); // Import webpack-obfuscator

module.exports = {
  entry: "./src/index.js", // Update with your entry file name
  output: {
    filename: "1-test.js", // Output file name
    path: __dirname + "/dist", // Output directory path
  },
  optimization: {
    minimizer: [new TerserPlugin()], // Minimize output using Terser
  },
  // plugins: [
  //   // // Add the WebpackObfuscator plugin to obfuscate your code
  //   new WebpackObfuscator({
  //     rotateStringArray: true,
  //     stringArrayThreshold: 0.75,
  //   }),
  // ],
  watch: true,
  mode: "development", // Set mode to production
};