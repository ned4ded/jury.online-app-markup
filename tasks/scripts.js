import gulp from 'gulp';
import config from '../gulpfile.config';
import path from 'path';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

let wpConfig = {
  mode: 'production',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // Popper: 'popper.js'
    })
  ]
}

export function scripts() {
  return gulp.src(config.paths.scripts)
    .pipe(webpackStream(wpConfig))
    .pipe(gulp.dest(path.join(config.server.dest, 'js')));
}
