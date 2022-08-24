const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackRemoteTypesPlugin = require('webpack-remote-types-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

const deps = require('./package.json').dependencies;

const isPatternflyStyles = (stylesheet) =>
  stylesheet.includes('@patternfly/react-styles/css/') ||
  stylesheet.includes('@patternfly/react-core/') ||
  stylesheet.includes('@patternfly/react-code-editor') ||
  stylesheet.includes('monaco-editor-webpack-plugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3004,
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'auto',
  },
  // optimization: {
  //   splitChunks: false
  // },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.css|s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: (stylesheet) => !isPatternflyStyles(stylesheet),
        sideEffects: true,
      },
      {
        test: /\.css$/,
        include: isPatternflyStyles,
        use: ['null-loader'],
        sideEffects: true,
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      insert: (linkTag) => {
        const preloadLinkTag = document.createElement('link');
        preloadLinkTag.rel = 'preload';
        preloadLinkTag.as = 'style';
        preloadLinkTag.href = linkTag.href;
        document.head.appendChild(preloadLinkTag);
        document.head.appendChild(linkTag);
      },
    }),
    new ModuleFederationPlugin({
      name: 'cosmosDbSourceLocal',
      // name: 'cosmosDbSourceRemote',
      filename: 'remoteEntry.js',
      exposes: {
        './CosmosView': './src/CosmosView',
      },
      remotes: {
        kaoto: 'kaoto@http://localhost:1337/remoteEntry.js',
      },
      shared: {
        ...deps,
        '@patternfly/patternfly': {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps['@patternfly/patternfly'],
        },
        '@patternfly/react-core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps['@patternfly/react-core'],
        },
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    // new WebpackRemoteTypesPlugin({
    //   remotes: {
    //     kaoto: 'kaoto@http://localhost:1337/',
    //   },
    //   outputDir: './src/@kaoto',
    //   remoteFileName: '[name]-dts.tgz',
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  stats: 'errors-only',
};
