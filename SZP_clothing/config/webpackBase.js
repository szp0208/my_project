const ExtractTextPlugin = require("extract-text-webpack-plugin") // css单独打包
const path = require('path')
const svgDirs = [
  // require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'image')  // 2. 自己私人的 svg 存放目录
]

module.exports = {
  rules: [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      })
    },
// {
//     test: /\.js[x]?$/,
//     enforce: 'pre',
//     use: [{
//         loader: 'eslint-loader',
//         options: { fix: true }
//     }],
//     include: path.resolve(__dirname, './src/**/*.js'),
//     exclude: /node_modules/
// },
    {
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0'],
          // presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
          plugins: [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
            ['import', {
              libraryName: 'antd',
              style: true
            }]
          ],
          cacheDirectory: true
        }
      }],
      exclude: /node_modules/
    },
    {
    // test: /\.(jpe?g|gif|jpg|png|woff|svg|eot|ttf)$/i,
      test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
      use: 'url-loader?limit=15000&name=image/[name].[ext]'
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      })
    },
    {
      test: /\.(svg)$/i,
      use: 'svg-sprite-loader',
      include: svgDirs  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
    }
  ]
}
