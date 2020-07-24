const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: resolve(__dirname, 'docs'),
        publicPath: '/cil-uady/',
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            //options
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                    publicPath: 'img',
                    name: '[sha512:hash:base64:7].[ext]'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new FaviconsWebpackPlugin({
            logo: './src/favicon.svg',
            cache: '.wwp-cache',
            mode: 'webapp',
            prefix: 'assets/',
            favicons: {
                appName: 'CIL-UADY',
                appDescription: 'Sitio de la Coordinación del Centro Institucional de Lenguas | UADY. La UADY se encuentra en Mérida, Yucatán, México',
                developerName: 'eosfelipe',
                developerURL: 'https://github.com/eosfelipe',
                dir: 'auto',
                lang: 'en-ES',
                background: '#f5f5f5',
                theme_color: '#e0910e',
                appleStatusBarStyle: 'black-translucent',
                version: '1.0.0',
                logging: true,
                icons: {
                    coast: false,
                    yandex: false
                }
            }
        })
    ]
};