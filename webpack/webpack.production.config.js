var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require('glob');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8080";

// local css modules
loaders.push({
    test: /[\/\\]src[\/\\].*\.css/,
    exclude: /(node_modules|bower_components|public)/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
});

// local scss modules
loaders.push({
    test: /[\/\\]src[\/\\].*\.scss/,
    exclude: /(node_modules|bower_components|public)/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass')
});
// global css files
loaders.push({
    test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css')
});

module.exports = {
    entry: {
        app: glob.sync("./src/**/*.jsx"),
        vendor: [
            'jquery',
            'bootstrap',

            './public/vendor/jquery.validate.js',
            './public/vendor/additional-methods.js',
            './public/vendor/datepicker/jalali.js',
            './public/vendor/datepicker/calendar.js',
            './public/vendor/datepicker/calendar-setup.js',
            './public/vendor/datepicker/calendar-en.js',
            './public/vendor/datepicker/calendar-fa.js',
            './public/vendor/app.js',
            './public/vendor/layout.js',
            './public/vendor/jquery.textcomplete.js',
            './public/vendor/emojarea.js',
        ]
    },
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'build-[chunkhash].js',
        publicPath: "/"
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
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: false,
                drop_debugger: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[contenthash].css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({jQuery: 'jquery'}),
        new webpack.ProvidePlugin({$: 'jquery'})
    ],
    target: 'web',
    node: {
        fs: "empty"
    }
};
