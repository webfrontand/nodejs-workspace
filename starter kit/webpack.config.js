var path = require("path");

var DIST_DIR = path.resolve(__dirname,"dist");
var SRC_DIR = path.resolve(__dirname,"src");

var config = {
	entry: SRC_DIR + "/app/index.js",
	output: {
		path: DIST_DIR + "/app",
		filename:"bundle.js",
		publicPath: "/app/"
	},
	modules: {
		loaders:[
			{
				test:/\.js?/,
				include:SRC_DIR,
				loader: "babel-loader",
				query:{
					presets:["react","es2015","stage-2"]
				},
				{
					test: /\.css$/,
					loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
				}
			}
		]
	}
};

module.exports = config;
