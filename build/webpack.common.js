const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV);
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                   // 'style-loader',
                   // 'vue-style-loader',
                   // 'postcss-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    'overrideBrowserslist': ['ie 9-11', 'last 5 version'] //兼容IE9到11，所有浏览器最近五个版本
                                })
                            ]
                        }
                    }

                ],
            },
            //ExtractTextPlugin方式
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         use: [{
            //                 loader: 'css-loader',
            //             },
            //             {
            //                 loader: 'sass-loader'
            //             },
            //             {
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     plugins: [
            //                         require("autoprefixer")({
            //                             'overrideBrowserslist': ['ie 9-11', 'last 5 version'] //兼容IE9到11，所有浏览器最近五个版本
            //                         })
            //                     ]
            //                 }
            //             }
            //         ],
            //         fallback: 'vue-style-loader'
            //     })
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    publicPath: '../', //图片路径
                    limit: 8000,
                    name: "images/[hash:7].[ext]"
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: {
                //     loaders: {
                //         'css': ExtractTextPlugin.extract({
                //             use: [{
                //                     loader: 'css-loader',
                //                 },
                //                 {
                //                     loader: 'postcss-loader',
                //                     options: {
                //                         plugins: [
                //                             require("autoprefixer")({
                //                                 'overrideBrowserslist': ['ie 9-11', 'last 5 version'] //兼容IE9到11，所有浏览器最近五个版本
                //                             })
                //                         ]
                //                     }
                //                 }
                //             ],
                //             fallback: 'vue-style-loader'
                //         }),
                //         'sass': ExtractTextPlugin.extract({
                //             use: [{
                //                     loader: 'sass-loader',
                //                 },
                //                 {
                //                     loader: 'postcss-loader',
                //                     options: {
                //                         plugins: [
                //                             require("autoprefixer")({
                //                                 'overrideBrowserslist': ['ie 9-11', 'last 5 version'] //兼容IE9到11，所有浏览器最近五个版本
                //                             })
                //                         ]
                //                     }
                //                 }
                //             ],
                //             fallback: 'vue-style-loader'
                //         })
                //     },
                // }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['es2015'],
                    //     plugins: ['transform-runtime']
                    // },
                },
                include: path.resolve(__dirname, '../src')
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // new ExtractTextPlugin({
        //     filename: 'css/[name].[chunkhash].css',
        //     allChunks: true,
        // }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static'),
            ignore: ['.*']
        }])
    ]
}