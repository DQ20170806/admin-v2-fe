const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const  webpack  = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
     publicPath:'/dist/',
    // filename: 'app.js',
    filename: 'js/app.js',
  },
  resolve: {
    alias : {
        page: path.resolve(__dirname, 'src/page'),
        component:path.resolve(__dirname,'src/component')
    }
},
  module: {
    rules: [
      // react语法的处理
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/react']
          }
        }
      },
      // css文件的处理
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片的处理
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            },
          },
        ]
      },
      //字体图标的配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            },
          },
        ]
      },
    ]
  },  
  plugins: [
    new HtmlWebpackPlugin({
      "template":'./src/index.html',
      "favicon":'./favicon.ico'
    }),
    // 独立css文件
    // new ExtractTextPlugin("index.css"),
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    // new webpack.optimize.CommonsChunkPlugin({
    //     name:'common',
    //     filename:'js/base.js'
    // })
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename: 'js/base.js'
  })
  ],
  devServer: {
    historyApiFallback: {
      index: '/dist/index.html'
  },
    port:8086
  },
};
