const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "1.js",
    path: __dirname + "/dist",
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new Dotenv({
      path: `./.env.prod`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  watch: true,
  mode: "production",
};
