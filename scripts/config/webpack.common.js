const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { PROJECT_PATH, isDev } = require('../constants')

module.exports = {
	entry: {
		app: path.resolve(PROJECT_PATH, './src/app.js'),
	},
	output: {
		filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
		path: path.resolve(PROJECT_PATH, './dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(PROJECT_PATH, './public/index.html'),
			filename: 'index.html',
			cache: false,
			minify: isDev
				? false
				: {
						removeAttributeQuotes: true,
						collapseWhitespace: true,
						removeComments: true,
						collapseBooleanAttributes: true,
						collapseInlineTagWhitespace: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true,
						useShortDoctype: true,
				  },
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
							sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
							importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
						},
					},
				],
			},
		],
	},
}
