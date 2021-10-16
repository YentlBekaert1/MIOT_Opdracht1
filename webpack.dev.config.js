const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
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
     }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "./index.html",
      excludeChunks: [ 'server' ],
      template: './src/html/index.html',
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      maximumFileSizeToCacheInBytes: 20*1024*1024
    }),
    new WebpackPwaManifest({
      name: 'MyTrainingsData',
      short_name: 'MTD',
      description: 'Log all your trainingdata!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/assets/logo-512.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
          src: path.resolve('src/assets/maskable-1024.png'),
          size: '1024x1024' // you can also use the specifications pattern
        },
        {
          src: path.resolve('src/assets/maskable-1024.png'),
          size: '1024x1024',
          purpose: 'maskable'
        }
      ],
      images: [
        {
          src: path.resolve('src/img/logo.png'),
          //size: '1024x1024' // you can also use the specifications pattern
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}