"use strict";
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var loaders = require('./webpack.loaders.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// global css
loaders.push({
	test: /[\/\\](node_modules|global|src)[\/\\].*\.css$/,
	loaders: [
		'style?sourceMap',
		'css'
	]
});
// local scss modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.scss/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /[\/\\]src[\/\\].*\.css/,
	exclude: /(node_modules|bower_components|public)/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
	]
});

module.exports = {
	entry: {
		webpack: [
			`webpack-dev-server/client?http://${HOST}:${PORT}`,
			`webpack/hot/only-dev-server`
		],
		app: glob.sync("./src/**/*.jsx"),
		vendor: [
			'./metronic/vendor/fetch.js',
			'jquery',
			'bootstrap',
			'./metronic/vendor/jquery.validate.js',
			// './metronic/vendor/jquery.lobibox.js',
			// './metronic/vendor/notifications.js',
			'./metronic/vendor/additional-methods.js',
			'./metronic/vendor/bootstrap-switch.js',
			'./metronic/vendor/app.js',
			'./metronic/vendor/dashboard.js',
			'./metronic/vendor/layout.js',
			'./metronic/vendor/demo.js',
			'./metronic/vendor/quick-nav.js',
			'./metronic/vendor/jquery.backstretch.js'
		]
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: "/",
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: "./public",
		noInfo: true,
		hot: true,
		inline: true,
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin({jQuery: 'jquery'}),
		new webpack.ProvidePlugin({$: 'jquery'}),
	],
	target: 'web'
};
