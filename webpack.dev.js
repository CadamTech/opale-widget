const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/modal.js', // Update with your entry file name
  output: {
    filename: '1-test.js', // Output file name
    path: __dirname + '/dist', // Output directory path
  },
  optimization: {
    minimizer: [new TerserPlugin()], // Minimize output using Terser
  },
  watch: true,
  mode: 'development', // Set mode to production
};