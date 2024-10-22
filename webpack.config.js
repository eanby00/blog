const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mode: "development",
  entry: { main: "./src/main.js", post: "./src/post.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public", "script"),
    publicPath: "public/script/",
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    devMiddleware: {
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
    new CleanPlugin.CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
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
