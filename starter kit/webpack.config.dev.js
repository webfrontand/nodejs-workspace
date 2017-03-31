import path from 'path';
import webpack from 'webpack';

export default {
    devtools: 'inline-source-map',
    debug: true,
    //devtools: "inline-eval-cheap-source-map",
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/index.js'),
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['babel']
            },
    				{
    					test: /\.css$/,
    					loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    				}
        ]
    },
    resolve: {
        extentions: ['', '.js']
    }
}
