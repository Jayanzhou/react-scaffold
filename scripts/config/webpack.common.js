const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { PROJECT_PATH, isDev } = require('../constants')

const getCssLoaders = (importLoaders) => [
	'style-loader',
	{
		loader: 'css-loader',
		options: {
			modules: false,
			sourceMap: isDev,
			importLoaders,
		},
	},
	{
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				ident: 'postcss',
				plugins: [
					// 修复一些和 flex 布局相关的 bug
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							grid: true,
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
					require('postcss-normalize'),
				],
			},
			sourceMap: isDev,
		},
	},
]

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
				use: getCssLoaders(1),
			},
			{
				test: /\.less$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'less-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
		],
	},
}
