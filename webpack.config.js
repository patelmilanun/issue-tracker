import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const config = {
  entry: [
    './src/App.jsx',
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
    },
  },
  devtool: 'source-map',
  mode: 'development'
}

export default config;