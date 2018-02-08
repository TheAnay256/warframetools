var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
              test: /\.css$/, 
              loader: "style-loader!css-loader" 
            },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
        ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}
