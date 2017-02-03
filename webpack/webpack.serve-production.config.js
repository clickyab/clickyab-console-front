var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8181";


module.exports = {
    entry: {
    },
    output: {
    },
    devServer: {
        contentBase: "./public",
        noInfo: false,
        hot: false,
        inline: true,
        historyApiFallback: {
            index: 'index.html'
        },
        port: PORT,
        host: HOST
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    target: 'web'
};
