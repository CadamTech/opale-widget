const TerserPlugin = require('terser-webpack-plugin');
// const WebpackObfuscator = require('webpack-obfuscator'); // Import webpack-obfuscator

module.exports = {
  entry: './src/modal.js',
  output: {
    filename: '1.js',
    path: __dirname + '/dist',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  // plugins: [
  //   // // Add the WebpackObfuscator plugin to obfuscate your code
  //   new WebpackObfuscator({
  //     rotateStringArray: true,
  //     stringArrayThreshold: 0.75,
  //   }),
  // ],
  watch: true,
  mode: 'production',
};