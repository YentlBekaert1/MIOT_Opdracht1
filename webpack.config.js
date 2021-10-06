const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader', 
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: 'asset/resource',
        generator: {
          //publicPath: '../fonts/',
          filename: 'compiled/fonts/[hash][ext][query]'
        }
     },
     {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }),
    new WebpackPwaManifest({
      name: 'MyTrainingsData',
      short_name: 'MTD',
      description: 'Log all uou trainingdata!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      publicPath: './',
      icons: [
        {
          src: path.resolve('./src/assets/logo-512.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('./src/assets/maskable-1024.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
        {
          src: path.resolve('./src/assets/maskable-1024.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ],images: [
        {
          src: path.resolve('./src/img/logo.png'),
          //size: '1024x1024' // you can also use the specifications pattern
        }
      ]
    }),
  ],
  
};