const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin   = require('copy-webpack-plugin');
const pages_dir = "./src/pug/pages/";
const page = fs.readdirSync(pages_dir).filter(fileName => fileName.endsWith('.pug'))
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
    mode: "development",
    entry: {
        main: "./src/js/index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./js/bundle.[hash].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...page.map(pages => new htmlWebpackPlugin({
            template: `./${pages_dir}/${pages}`,
            filename: `./${pages.replace(/\.pug/, '.html')}`,
        })),
        new CopyPlugin ({
            patterns: [
                {
                    from: 'src/images/favicon',
                    to: '../dist/images/favicon'
                },
                {
                    from: 'src/fonts',
                    to: '../dist/fonts'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[hash].css",
        }),
        new LiveReloadPlugin()
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: './src/js/postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: './src/js/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(png|svg|webp|jpg|gif|ico)$/,
                loader: 'file-loader?name=/images/[name].[hash].[ext]',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader?name=/fonts/[name].[hash].[ext]',
            }
        ]
    },
    devServer: {
        port: 9000
    }
}
