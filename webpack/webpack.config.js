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
			'jquery',
			'bootstrap',

            './public/vendor/fetch.js',
            './public/vendor/jquery.validate.js',
			'./public/vendor/additional-methods.js',
			'./public/vendor/bootstrap-switch.js',
			'./public/vendor/datepicker/jalali.js',
			'./public/vendor/datepicker/calendar.js',
			'./public/vendor/datepicker/calendar-setup.js',
			'./public/vendor/datepicker/calendar-en.js',
			'./public/vendor/datepicker/calendar-fa.js',
			'./public/vendor/app.js',
			'./public/vendor/dashboard.js',
			'./public/vendor/layout.js',
			'./public/vendor/demo.js',
			'./public/vendor/quick-nav.js',
			'./public/vendor/jquery.backstretch.js',
			'./public/vendor/animatedModal.js'
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
	target: 'web',
    node: {
        fs: "empty"
    }
};
