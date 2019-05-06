const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = withSass({
  cssModules: true,
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.css$/,
      include: /node_modules/,
      use: [
        ExtractCssChunks.loader,
        {
          loader: 'css-loader',
          options: {
              modules: false,
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    });

    const extractGlobalCSSPlugin = new ExtractCssChunks({
      filename: dev
        ? 'static/vendor.[name].css'
        : 'static/vendor.[name].[contenthash:8].css',
      chunkFilename: dev
        ? 'static/vendor.[name].chunk.css'
        : 'static/vendor.[name].[contenthash:8].chunk.css',
      hot: dev
    });
    config.plugins.push(extractGlobalCSSPlugin);

    return config;
  },
});
