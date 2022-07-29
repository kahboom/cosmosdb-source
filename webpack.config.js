const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require("path");

const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3004,
  },
  optimization: {
    splitChunks: false,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [["@babel/preset-react", {"runtime": "automatic"}], "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cosmosDbSourceRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
        "./Example": "./src/Example",
      },
      remotes: {
        kaoto: "kaoto@http://localhost:1337/remoteEntry.js",
      },
      shared: {
        ...deps,
        "react": { singleton: true, strictVersion: true, requiredVersion: '18.0.0' },
        "react-dom": { singleton: true, strictVersion: true, requiredVersion: '18.2.0' }
      },
    }),
    new WebpackRemoteTypesPlugin({
      remotes: {
        kaoto: 'kaoto@http://localhost:1337/',
      },
      outputDir: './src/types',
      remoteFileName: '[name]-dts.tgz'
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  stats: 'errors-only',
};
