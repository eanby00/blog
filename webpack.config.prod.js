const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = {
  mode: "production",
  entry: { main: "./src/main.js", post: "./src/post.js" },
  output: {
    filename: "script/[name].js",
    path: path.resolve(__dirname, "docs"),
    clean: {
      keep: (filename) => {
        return (
          filename.includes("style") ||
          filename.includes("post") ||
          filename.includes("index.development.html") ||
          filename.includes("main.development.js") ||
          filename.includes("post.development.js")
        );
      },
    },
  },
  devtool: "cheap-source-map",
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
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./template/post/index.html",
      filename: "post/index.html",
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
