/**
 *  xuanshanbo
 *  294662037@qq.com
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')  //css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 性能分析图插件
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
// const ReactJsx = require('eslint-plugin-react')
const path = require('path')
const ServerS = require('./config/server.js')
const fs = require('fs')
const webpackBase = require('./config/webpackBase.js')
const aliasPath = path.join(__dirname, './public/')
let alias = {},
  files = fs.readdirSync(aliasPath)
files && files.filter(file => file.indexOf('.js') > -1).map(file => {
  let name = file.substring(0, file.lastIndexOf('.'))
  alias[name] = aliasPath + file
})

module.exports = (env, arge) => {
  const contentBase = env.project == 'admin' ? 'adminDist' : 'supplierDist'//  两个项目 分开来
  const entry = env.project == 'admin' ? '/src_admin/index' : '/src_supplier/index'
  return {
    devtool: 'eval-source-map',
    entry: {
      app: [
        'babel-polyfill',
        __dirname + entry //唯一入口文件
      ]
    },
    output: {
      path: path.resolve(__dirname, '..', `${contentBase}`), //打包后的文件存放的地方
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[id].[chunkhash].js',
      publicPath: '/'
    },
    devServer: {
      // contentBase: path.resolve(__dirname, `${contentBase}`),  //本地服务器所加载的页面所在的目录
      host: ServerS.host,
      port: ServerS.port,
      // hot: true,
      historyApiFallback: ServerS.historyApiFallback,
      // inline: ServerS.inline,
      open: ServerS.open,
      proxy: ServerS.proxy,
      // 本地访问
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      disableHostCheck: true
    },
    module: webpackBase,
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/[name].[chunkhash].main.css',
        allChunks: true
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: function() {
            return [
              // require('postcss-pxtorem')({
                // rootValue: 16,
                // propWhiteList: ['*']
              // }),
              require('autoprefixer')
            ]
          }
        }
      }),
      // new webpack.NamedModulesPlugin(),
      // new BundleAnalyzerPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        filename: './index.html', //生成的html存放路径，相对于 path
        template: './template/index.html', //html模板路径
        hash: true,    //为静态资源生成hash值
        minify: { //压缩HTML文件
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: false //删除空白符与换行符
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      })
      //webpack3.0以上new，作用域提升
      /*new webpack.optimize.ModuleConcatenationPlugin(),
      // dll方法 提交性能体积优化
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./build/bundle.manifest.json")
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
        files: ['./index.html'], // ['./!**!/!*.html'] 全局下所有html文件
        append: false,
        // hash: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/common.[chunkhash].js',
        minChunks: 2
      })*/
    ],
    resolve: {
      modules: ['node_modules', path.join(__dirname, './node_modules')],
      extensions: ['.web.js', '.js', '.json', 'jsx', '*', '.tpl', '.scss'],
      alias: alias
    },
    // cdn方法 提交性能体积优化
    /*externals: {
      'lodash': '_',
    }*/
  }
}
console.log(`启动服务地址localhost:${ServerS.port}`)
