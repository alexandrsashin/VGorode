const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry: [paths.appIndexJs],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif|ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    modules: [paths.appSrc, 'node_modules'],
    alias: {
      components: path.resolve(paths.appSrc, 'components'),
      pages: path.resolve(paths.appSrc, 'pages'),
      styles: path.resolve(paths.appSrc, 'styles')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};
