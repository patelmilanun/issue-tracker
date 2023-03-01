const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: [
        './src/App.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        new BundleAnalyzerPlugin()
      ],
      devServer: {
        port: 8000,
        static: {
          directory: path.join(__dirname, 'static'),
        },
        proxy: {
          '/api/*': {
            target: 'http://localhost:3000'
          }
        }
      }
}

module.exports = config;