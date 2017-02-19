var HtmlWebpackPlugin = require('html-webpack-plugin');
var backsystemUrl = '/../service/views/blog';
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        bundle: __dirname + "/components/Router.js",
        vendor: ['react']
    },
    output: {

        path: __dirname + backsystemUrl + "/dist/",
        filename: "bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: `${__dirname}/src`,
                exclude: /bundle\.js$/
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            }, {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.scss$/,
                loader: "style!css!sass!postcss-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
              test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
              loader: 'file'
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        inline: true,
        port: 8008,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Allen - 樱花博客',
            filename: __dirname+ backsystemUrl + '/dist/index.html',
            hash: true,
            inject: true,
            template: __dirname + '/src/index-template.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js')
    ]
};


// entry     入口文件
// outout    出口文件
// resolve   定义解析模块路径，通常设置extensions,可以在导入模块的时候不用写后缀名
// plugins   定义需要使用的插件,
// module.loaders  定义文件加载器

