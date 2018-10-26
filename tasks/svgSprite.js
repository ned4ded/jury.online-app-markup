import gulp from 'gulp';
import path from 'path';
import fs from 'fs';
import sprite from 'gulp-svg-sprite';
import config from '../gulpfile.config';
import xmldom from 'xmldom';

const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;

export function svgSprite() {
  return gulp.src(config.paths.svgAll)
    .pipe(sprite({
      shape: {
        transform: [{
          svgo: {
            plugins: [{
                removeViewBox: false
              },
              {
                removeDimensions: true
              },
              {
                removeAttrs: {
                  // attrs: 'fill'
                }
              },
            ]
          }
        }, ]
      },
      mode: {
        symbol: {
          prefix: '.',
          dimensions: '%s',
          sprite: path.join(config.server.assets, 'sprite.svg'),
          bust: false,
          render: {
            scss: {
              dest: path.join(config.paths.stylesSvgSprite, '_sprite.scss'),
              template: config.paths.svgTemplate,
            },
          },
          // example: {
          //   // dest: path.join(config.server.dest, 'example.html'),
          // },
        },
      },
      svg: {
        transform: [
          function(svg) {
            const s = new XMLSerializer();

            const styles = fs.readFileSync(config.paths.svgStylesTemplate, 'utf-8');

            const parsedStyles = new DOMParser().parseFromString(styles, "image/svg+xml");
            const parsedSvg = (new DOMParser().parseFromString(svg, "image/svg+xml"));

            const svgTag = parsedSvg.getElementsByTagName('svg')[0];

            svgTag.insertBefore(parsedStyles.getElementsByTagName('svg')[0].firstChild, svgTag.firstChild);

            return s.serializeToString(parsedSvg);
          }
        ]
      }
    }))
    .pipe(gulp.dest(config.paths.root));
}
