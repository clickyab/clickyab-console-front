'use strict';

/* global __dirname */
var path = require('path'),
    glob = require('glob'),
    webpack = require('webpack');

var configuration = {
    devtool: 'source-map',
    entry: {
        app: glob.sync("./metronic/src/**/*.jsx"),
        vendor: [
            'jquery',
            'bootstrap',
            './metronic/vendor/bootstrap-switch.js',
            './metronic/vendor/app.js',
            './metronic/vendor/layout.js',
            './metronic/vendor/demo.js',
            './metronic/vendor/quick-sidebar.js',
            './metronic/vendor/quick-nav.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, compress: { warnings: false }}),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': "development" }),
        new webpack.ProvidePlugin({jQuery: 'jquery'}),
        new webpack.ProvidePlugin({$: 'jquery'})
    ],
    resolve: {
        modulesDirectories: [ 'node_modules' ],
        extensions: [ '', '.js', '.jsx' ]
    },
    target: 'web'
};

module.exports = configuration;