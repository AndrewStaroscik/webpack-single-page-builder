const webpack = require('webpack');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host || '0.0.0.0', // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
};

exports.babelLoader = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          include: paths,
          query: {
            presets: ['es2015']
          }
        }
      ]
    }

  };
};

exports.setupCSS = function(paths) {

  return {
    module: {
        loaders: [
            {
                test:   /\.styl$/,
                loader: "style-loader!css-loader!postcss-loader!stylus-loader",
                
            }
        ]
    },
    include: paths,
    postcss: function () {
        return [precss, autoprefixer];
    }
  }
};

//let extractStyl = new ExtractTextPlugin('./styles/[name].css')

exports.extractCSS = function(paths, custName) {
  return {
    module: {
        loaders: [
            {
                test:   /\.styl$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!stylus-loader"),
                include: paths
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('./styles/' + custName)
    ]
  };
}

exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
};