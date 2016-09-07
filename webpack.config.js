module.exports = {
    entry: [
        './public/client/index/client.index.js'
    ],
    output: {
        path: './public/bin',
        filename: 'home.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    }
};
