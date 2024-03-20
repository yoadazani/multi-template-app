import path from 'path';
import nodeExternals from 'webpack-node-externals';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

import { env } from './config'


module.exports = {
    entry: './src/app.ts',
    devtool: env === 'development' ? 'inline-source-map' : 'source-map',
    mode: env,
    watch: env === 'development',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    plugins: [
        new WebpackShellPluginNext({
            onBuildEnd: {
                scripts: ['npm run start:prod'],
                blocking: true,
                parallel: false
            }
        })
    ],
    externals: [
        nodeExternals()
    ]
}
