const path = require('path')
const webpack = require('webpack')
//css压缩const
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackUglifyParallel = require('webpack-uglify-parallel')
const os = require('os')
const webpackBase = require('./config/webpackBase.js')

//把css样式从打包文件里面分离出来const
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    bundle: [
      // 特殊形式引入
      path.resolve(__dirname, './node_modules/antd/lib'),
      'react',
      'redux',
      'react-dom',
      'react-redux',
      'react-router',
      'moment',
      'core-js',
      'lodash'
      //其他库
    ]
  },
  module: webpackBase,
  output: {
    path: path.resolve(__dirname, 'build'),
    //打包编译完的文件根目录
    filename: 'js/[name].dll.js',
    //打包编译完文件路径和名称
    library: '[name]_[hash]'
  },
  plugins: [
    // js压缩
    new webpackUglifyParallel({
      workers: os.cpus().length,
      mangle: true,
      exclude: /\.min\.js$/,
      output: {comments: false},
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash:8]-dll.css',
      allChunks: true
    }),
    // css压缩
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    }),
    // webpack3.0以上new
    new webpack.optimize.ModuleConcatenationPlugin(),
    // dll 配置
    new webpack.DllPlugin({
      path: path.join(__dirname, 'build', '[name].manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
