import gulp from 'gulp';
import path from 'path';
import config from '../gulpfile.config';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import clean from 'gulp-clean-css';

// postcss plugins
import presetEnv from 'postcss-preset-env';
import cssImport from 'postcss-import';

export function styles() {
  return gulp.src(config.paths.stylesBase)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      cssImport(),
      presetEnv({
        stage: 2,
        browsers: 'last 2 versions'
      }),
    ]))
    .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest(path.join(config.server.dest, 'css')));
}
