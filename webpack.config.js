const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path') 

module.exports = function (env, argv) {
    console.log(env)

    const config = {
        stats: "verbose",
        devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
        entry: {
            background: './src/background/',
            // TO DO ADD CONTENT_SCRIPT? content_script: '',
            pop_up: './src/popup/index.tsx',
        },
        module: {
            rules: [
                {
                  test: /(?<!\.d)\.tsx?$/,
                  use: 'ts-loader',
                  exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },                {
                    test: /\.svg$/i,
                    use: ['svg-url-loader']
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
        plugins:[
            new CopyWebpackPlugin({
                patterns:[
                    {
                        from: 'static',
                    }
                ]
            }
            ),
            new GenerateJsonPlugin(
                'manifest.json',
                merge(
                  require('./manifest/manifest.json'),
                ),
                null,
                2
            )
        ],
        optimization: {
            minimize: false
        },
        watch: argv.mode === 'development'? true : false
    }

    return config;
}