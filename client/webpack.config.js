var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  devtool: debug ? "inline-sourcemap" : null,
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    __dirname + "/entry.js"
  ],
  output: {
    path: __dirname + "/public",
    filename: "scripts.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&åimetype=application/font-woff&name=[path][name].[ext]"
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      },
      {
        test: /\.(eot|ttf|svg|gif|png|jpg)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },

      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties']
        }
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }, 
  devServer: {
    contentBase: __dirname + "/public",
    noInfo: true,
    inline: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};