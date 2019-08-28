'use strict'
process.env.NODE_ENV = 'dev'
const ExtractTextPlugin = require('extract-text-webpack-plugin') //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const webpackBase = require('./config/webpackBase.js')
const aliasPath = path.join(__dirname, './public/')

let alias = {},
  files = fs.readdirSync(aliasPath)

files && files.map(file => {
  let name = file.substring(0, file.lastIndexOf('.'))
  alias[name] = aliasPath + file
})
module.exports = (env, argv) => {
  const contentBase = env.project == 'admin' ? 'adminDist' : 'supplierDist'//  两个项目 分开来
  const entry = env.project == 'admin' ? '/src_admin/index.js' : '/src_supplier/index.js'

  return {
    devtool: 'eval-source-map',
    entry: {
      app: [
        'babel-polyfill',
        __dirname + entry //唯一入口文件
      ]
    },
    output: {
      path: path.resolve(__dirname, `./${contentBase}`), //打包后的文件存放的地方
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[id].[chunkhash].js',
      publicPath: '/gss/'
    },
    module: webpackBase,
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/[name].[chunkhash].main.css',
        // allChunks: true,
      }),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: function () {
              return [
                // require('postcss-pxtorem')({
                //   rootValue: 10,
                //   propWhiteList: []
                // }),
                // require('autoprefixer')({
                //   browsers: ['not ie <= 8', 'last 2 versions'],
                //   remove: true // 是否去掉不必要的前缀 默认：true
                // })
                require('autoprefixer')
              ]
            }
          }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
          filename: './index.html', //生成的html存放路径，相对于 path
          template: './template/index.html', //html模板路径
          hash: true,    //为静态资源生成hash值
          minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true //删除空白符与换行符
          }
        }),
        // webpack中-p代表--optimize-minimize也就是压缩的意思,cli中progress代表显示编译进度
        // webpack -p压缩的时候不会去掉一些注释，所以在这里可以设置一下，进一步压缩文件
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false,
            // 去掉debugger和console
          drop_debugger: true
            // drop_console: true
        }
      }),
        // new webpack.optimize.DedupePlugin(),
        // DefinePlugin()方法能创建可以在编译时配置的全局常量，这可能是非常有用的，允许开发版本和编译出的版本具有不同的行为
        // 在这里将环境设置为时'production'时，react会自动去掉没有用到的代码部分，让文件进一步精简
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('dev')
          }
        }),
        //webpack3.0以上new，作用域提升
      new webpack.optimize.ModuleConcatenationPlugin(),
        // dll方法 提交性能体积优化
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./build/bundle.manifest.json')
          // manifest: require(path.join(__dirname, 'build', '[name].manifest.json'))
      }),
        // 文件拷贝
      new CopyWebpackPlugin([{
        context: __dirname,
        from: './build/js/bundle.dll.js',
        to: 'js/'
      }]),
        // html模版插入插件
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ['js/bundle.dll.js'],
        files: ['./index.html'], // ['./**/*.html'] 全局下所有html文件
        append: false
          // hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'publicDom',
          minChunks: function (module, count) {
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
           }
        })
    ],
    resolve: {
      modules: ['node_modules', path.join(__dirname, './node_modules')],
      extensions: [ '.web.js', '.js', '.json','jsx', '*' ,'.html'],
      alias
    }
  }
}
