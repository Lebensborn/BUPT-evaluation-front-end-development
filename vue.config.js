const path = require('path');

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    runtimeCompiler: true,
    //部署时一定要注意这的路径 如果写成/就变为根路径，无法正确找到css和js文件
    //我在部署的时候在nginx服务器里使用了/api路径进行跨域，所以我并没有使用baseUrl
    //直接让axois的baseUrl为/api，本地和服务器都使用该地址进行跨域操作
    publicPath: './', // 设置打包文件相对路径
    devServer: {
        // open: process.platform === 'darwin',
        // host: 'localhost',
        port: 8080,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://124.70.77.11:8080/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: '#cheap-module-eval-source-map',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        externals: {
            vue: 'Vue',
            'element-ui': 'ELEMENT',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'vue-cropper': "vue-cropper",
            'axios': 'axios'
        },
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
                minChunkSize: 100
            }),
            new BundleAnalyzerPlugin({// 用于生成打包后的js大小分析
                analyzerMode: 'server',
                analyzerHost: '127.0.0.1',
                analyzerPort: 8889,
                reportFilename: 'report.html',
                defaultSizes: 'parsed',
                openAnalyzer: true,
                generateStatsFile: false,
                statsFilename: 'stats.json',
                statsOptions: null,
                logLevel: 'info'
            })
        ]
    },
    chainWebpack(config) {
        const cdn = {
            css: [
                // element-ui css
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
            ],
            js: [
                // vue must at first!
                'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
                // element-ui js
                'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
                // vuex
                'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.0/vuex.min.js',
                //vue-router
                'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.1/vue-router.min.js',
                //axios
                'https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js'
            ]

        }
        config.plugin('html').tap(args => {
            args[0].cdn = cdn
            return args
        })
    }
}