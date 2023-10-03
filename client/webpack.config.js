const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require("webpack");
const tsconfig = require("./tsconfig.json");
const dotenv = require("dotenv");


const mode = process.env.NODE_ENV || "development";
const isDev = mode === "development";
const isProd = !isDev;

const alias = Object.keys(tsconfig.compilerOptions.paths).reduce((result, aliasPath) => {
    const resolvePath = tsconfig.compilerOptions.paths[aliasPath][0].replace("*", "");
    result[aliasPath.replace("/*", "")] = path.resolve(path.join(__dirname, "src"), resolvePath);
    return result;
}, {});

const env = dotenv.config({ path: `.env.${mode}` }).parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

const optimizations = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    };
    if (isDev) {
        config.minimize = true;
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin({
                parallel: true,
            }),
        ]
    };
    return config;
};

const styles = () => {
    return isDev
        ? "style-loader"
        : {
            loader: MiniCssExtractPlugin.loader,
        }
};

module.exports = {
    mode: isDev ? "development" : "production",
    devtool: isDev && "source-map",
    context: path.resolve(__dirname, "src"),
    entry: "./index.tsx",
    output: {
        filename: isDev ? "[name].bundle.js" : "[name].[hash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [styles(), "css-loader", "postcss-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module\.s(a|c)ss$/,
                use: [styles(), "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.module\.css$/,
                use: [
                    styles(),
                    'css-modules-typescript-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:8]",
                                mode: "local",
                            },
                        }
                    },
                    "postcss-loader",
                ]
            },
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    styles(),
                    'css-modules-typescript-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: "[name]__[local]--[hash:base64:8]",
                                mode: "local",
                            },
                        }
                    },
                    "postcss-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(eot|ttf|otf|woff(2)?)$/,
                type: "asset/resource",
                generator: {
                    filename: isDev ? "fonts/[name].[ext]" : "fonts/[hash][ext][query]",
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: isDev ? "assets/[name].[ext]" : "assets/[hash][ext][query]",
                },
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias,
    },
    plugins: [
        new DefinePlugin(envKeys),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/favicon.ico"),
                    to: path.resolve(__dirname, "dist"),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
    devServer: {
        port: process.env.PORT,
        hot: true,
        contentBase: "./dist",
        historyApiFallback: true,
    },
    target: isDev ? "web" : "browserslist",
    optimization: optimizations(),
};