import gulp from 'gulp';
import config from '../gulpfile.config';
import path from 'path';
import webpack from 'webpack-stream';

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
}

export function scripts() {
  return gulp.src(config.paths.scripts)
    .pipe(webpack(wpConfig))
    .pipe(gulp.dest(path.join(config.server.dest, 'js')));
}
