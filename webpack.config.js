const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    proxy: {
      '/weather': {
        target: 'https://weather.visualcrossing.com',
        changeOrigin: true,
        pathRewrite: { '^/weather': '' },
      },
    },
  },
  mode: "development",
};