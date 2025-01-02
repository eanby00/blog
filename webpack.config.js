const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = {
  mode: "development",
  entry: { main: "./src/main.js", post: "./src/post.js" },
  output: {
    filename: "script/[name].development.js",
    path: path.resolve(__dirname, "docs"),
    clean: {
      keep: (filename) => {
        return (
          filename.includes(".css") ||
          filename.includes("index.html") ||
          filename.includes("main.js") ||
          filename.includes("post.js")
        );
      },
    },
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
    },
    devMiddleware: {
      index: "index.development.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      filename: "index.development.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./template/post/index.html",
      filename: "post/index.development.html",
      chunks: ["post"],
    }),
  ],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      vm: require.resolve("vm-browserify"),
      buffer: require.resolve("buffer/"),
      stream: require.resolve("stream-browserify"),
    },
  },
};
