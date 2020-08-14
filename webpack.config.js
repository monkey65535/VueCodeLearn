const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'source'), path.resolve('node_modules')]
    }
}
