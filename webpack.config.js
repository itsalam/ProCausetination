const webpack = require('webpack')

module.exports = function (env, argv) {
    const config = {
        devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
        entry: {
            background_page: '',
            content_script: '',
            pop_up: '',
        },
        module: {
            rules: [
                {
                  test: /\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
            ],
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            sourceMapFilename: '[name].js.map' // always generate source maps
        },
        resolve: {
            modules: ['./src', './node_modules'],
            extensions: [ '.tsx', '.ts', '.js' ],
        },

    }
}