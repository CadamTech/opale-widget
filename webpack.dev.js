const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "1-test.js",
    path: __dirname + "/dist",
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new Dotenv({
      path: `./.env.dev`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  watch: true,
  mode: "development",
};
