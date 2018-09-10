const path = require('path');

module.exports = {
    name: 'nmbr',
    mode: 'production',
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js',
        library: 'nmbr',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/, /test/],
                use: 'ts-loader'
            }
        ]
    }
};
