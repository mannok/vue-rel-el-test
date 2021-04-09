const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ArcGISPlugin = require('@arcgis/webpack-plugin');

module.exports = (env = {}) => ({
	mode: env.prod ? 'production' : 'development',
	devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
	entry: path.resolve(__dirname, './src/main.ts'),
	output: {
		path: path.resolve(__dirname, './dist'),
	},
	resolve: {
		alias: {
			// // this isn't technically needed, since the default `vue` entry for bundlers
			// // is a simple `export * from '@vue/runtime-dom`. However having this
			// // extra re-export somehow causes webpack to always invalidate the module
			// // on the first HMR update and causes the page to reload.
			// vue: '@vue/runtime-dom',
			'@': path.join(__dirname, './src')
			// esri: path.resolve(__dirname, 'node_modules/@arcgis/core')
		},
		extensions: ['.js', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico|woff2?|eot|ttf|otf)$/,
				oneOf: [
					{
						loader: 'url-loader',
						options: {
							esModule: false,
							limit: 8192,
							fallback: require.resolve('file-loader')
						},
						exclude: [path.resolve('./static'), path.resolve('./public')]
					},
					{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: !env.prod }
					},
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyWebpackPlugin({ patterns: [{ from: path.resolve('./public'), to: 'public' }] }),
		new webpack.ProvidePlugin({
			// Waves: 'node-waves'
			moment: 'moment'
		}),
		new CleanWebpackPlugin(),
		new ArcGISPlugin()
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: false,
		overlay: true
	}
});
