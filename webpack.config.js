const path = require('path');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        {
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    ]
                },
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/src/index.htm') }
        )
    ]
}