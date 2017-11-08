const webpack = require('webpack');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./lib/index.js",
        library: "nmbr",
        libraryTarget: "umd"
    },

    root: [
        __dirname
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
};
