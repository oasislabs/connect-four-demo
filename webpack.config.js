const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const truffleConfig = require('./truffle-config.js')
const pages = fs.readdirSync('./src/pages').filter(name => !name.startsWith('.'))

// The number of HD Wallet accounts to inject into the page.
const NUM_ACCOUNTS = 5

module.exports = function (web3, network, artifacts) {
  let networkConfig = truffleConfig.config[network]

  let contract = artifacts.require('GameServerContract')

  return {
    entry: pages.reduce((acc, page) => {
      acc[page] = `./src/pages/${page}/index.js`;
      return acc;
    }, {}),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader?retainLines=true']
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].bundle.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'CONTRACT_ADDRESS': JSON.stringify(contract.address),
        'WS_ENDPOINT': JSON.stringify(networkConfig.wsEndpoint)
      }),
      new webpack.HotModuleReplacementPlugin(),
      ...pages.map(page => new HtmlWebpackPlugin({
        filename: `${page}.html`,
        chunks: [ page ],
        template: './src/template.html'
      })),
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new HtmlWebpackPlugin({
        title: 'Oasis Game'
      })
    ],
    devtool: 'cheap-eval-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    }
  }
};
