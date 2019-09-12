const merge = require("webpack-merge");
const path = require("path");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    output: {
        filename: 'js/[name].[chunkhash]js',
        path: path.resolve(__dirname, '../dist'),
    },
    optimization: {
        namedChunks: true,
        runtimeChunk: {
            name: 'manifest'
        },
        noEmitOnErrors: true, //编译错误时不生成
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        //webpack4.x废弃了
        // new webpack.optimization.splitChunks({
        //     name: 'vendor',
        //     minChunks: function (module) {
        //         return module.context && /\.js$/.test(module.context) && module.context.includes('node_modules');
        //     }
        // }),
        // new webpack.optimization.splitChunks({
        //     name: 'manifest',
        //     minChunks: Infinity,
        // }),
        // new webpack.optimization.splitChunks({
        //     name: 'app',
        //     asyc: 'vendor-async',
        //     children: true,
        // })
    ],
})