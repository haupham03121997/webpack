const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin =``
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (evn)=>{

  const basePlugins =[
    new MiniExtractPlugin({
      filename: '[name].[contenthash].css',
     
    })
  ,new HtmlWebpackPlugin({
  title: "Webpack 4",
  filename: "index.html",
}),

]
  const isDevelopment = Boolean(evn.development);
  const plugins = isDevelopment ? [...basePlugins , new BundleAnalyzerPlugin()]: basePlugins;
  return {
    mode:isDevelopment ? "development" : 'production',
    entry: {
      app: path.resolve('src/index.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js",
      clean: true,
      assetModuleFilename: '[file]'
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/,
          use: [MiniExtractPlugin.loader , 'css-loader', 'sass-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env' ,
              {
                debug: true, // Hiển thị debug lên terminal để dễ debug
                useBuiltIns: 'usage', // Dùng cái này thì đơn giản nhất, không cần import core-js vào code
                corejs: '3.27.1' // nên quy định verson core-js để babel-preset-env nó hoạt động tối ưu
              }
            ]]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
          type: 'asset/resource'
        }
      ],
    },
    plugins,
    devServer: {
      static: {
        directory: 'dist' // Đường dẫn tương đối đến với thư mục chứa index.html
      },
      port: 3000, // Port thay cho port mặc định (8080)
      open: true, // Mở trang webpack khi chạy terminal
      hot: true, // Bật tính năng reload nhanh Hot Module Replacement
      compress: true, // Bật Gzip cho các tài nguyên
      historyApiFallback: true // Set true nếu bạn dùng cho các SPA và sử dụng History API của HTML5
    },
    devtool: isDevelopment ?  "source-map" : false
  }
}