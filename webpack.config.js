const path = require('path');

module.exports = function () {
    return {
        name: 'nmbr',
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
            loaders: [
                {
                    test: /\.ts$/,
                    exclude: [/node_modules/, /test/],
                    use: [{
                        loader: 'ts-loader'
                    }]
                }
            ]
        }
    };
};
