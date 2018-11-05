import gulp from 'gulp';
import fs from 'fs';
import config from '../gulpfile.config';
import engine from 'gulp-nunjucks-render';
import minify from 'gulp-htmlmin';

export function html() {
  const envHooks = [
    env => env.addFilter('typeOf', function(el) {
      const type = typeof el;

      const getType = (t) => {
        if (t == 'object') {

          return el instanceof Array ? 'array' : 'object';
        }

        return t;
      }

      return getType(type);
    }),
    env => env.addFilter('addToArray', function(array, element) {
      array.push(element);

      return;
    }),
    env => env.addFilter('objectAssign', function(obj1, ...objects) {
      Object.assign(obj1, ...objects);

      return;
    }),
  ]

  const data = fs.readdirSync(config.paths.datasets).reduce((acc, fileName) => {
    return { ...acc,
      [fileName]: require('../' + config.paths.datasets + '/' + fileName)
    };
  }, {});

  data.get = function(name) {
    return this[name];
  }

  return gulp.src(config.paths.pages)
    .pipe(engine({
      data: {
        datasets: data,
      },
      path: ['src/pages/templates'],
      manageEnv: function(env) {
        return envHooks.forEach(fn => fn(env));
      },
    }))
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.server.dest))
};
