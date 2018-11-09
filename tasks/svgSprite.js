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

            const filtersFiles = fs.readdirSync(config.paths.svgFilters);
            const filters = filtersFiles.map(name => {
              return { root: new DOMParser().parseFromString(fs.readFileSync(config.paths.svgFilters + name, 'utf-8'), "image/svg+xml"), name };
            });

            filters.forEach(({ root, name }) => {
              const filters = Array.from(root.getElementsByTagName('filter'));

              filters.forEach(filter => {
                const id = filter.getAttribute('id');
                const newId = id ? name.split('.').slice(0, -1).join('.') + '-' + id : name;

                filter.setAttribute('id', newId);

                svgTag.appendChild(filter);
              });
            });

            return s.serializeToString(parsedSvg);
          }
        ]
      }
    }))
    .pipe(gulp.dest(config.paths.root));
}
