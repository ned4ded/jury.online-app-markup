import gulp from 'gulp';
import path from 'path';
import Registry from 'undertaker-registry';
import config from './gulpfile.config.js'

import bs from 'browser-sync';

import { html } from './tasks/html';
import { scripts } from './tasks/scripts';
import { styles } from './tasks/styles';
import { svgSprite } from './tasks/svgSprite';

const registry = new Registry();
registry.set('html', html);
registry.set('scripts', scripts);
registry.set('styles', styles);
registry.set('svgSprite', svgSprite);

gulp.registry(registry);

const webserver = bs.create();

export function runWebserver(done) {
  webserver.init({
    open: false,
    ui: false,
    server: config.server.dest,
    files: path.join(config.server.dest, 'index.html'),
    host: config.server.host,
    port: config.server.port,
    reloadOnRestart: true,
    logConnections: true,
    ghostMode: false,
  }, done);

  return;
}

function reloadWebserver(done) {
   webserver.reload();

   done();

  return;
}

function watch(done) {
  gulp.watch(config.paths.pagesAll, gulp.series('html', reloadWebserver));
  gulp.watch(config.paths.scriptsAll, gulp.series('scripts', reloadWebserver));
  gulp.watch(config.paths.stylesAll, gulp.series('styles', reloadWebserver));

  done();

  return;
}

gulp.task('serve', gulp.series('svgSprite', gulp.parallel('html', 'scripts', 'styles'), runWebserver, watch));

export default gulp.task('serve');
