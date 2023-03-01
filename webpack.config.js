const webpack = require('webpack');
const path = require('path');

// module.exports = {
//     mode: 'development',
//     entry: './src/App.jsx',
//     output: {
//         path: path.resolve(__dirname, 'static'),
//         filename: 'app.bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-react', '@babel/preset-env']
//                     }
//                 }
//             },
//         ]
//     }

// }

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
}

module.exports = config;