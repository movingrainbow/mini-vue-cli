const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devtool: 'inline-cheap-module-source-map', //详情https://www.webpackjs.com/configuration/devtool/
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8081
    },
    plugins: [
        //启用热更新配置项
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
})