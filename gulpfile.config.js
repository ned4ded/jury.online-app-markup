import path from 'path';

export default {
  server: {
    dest: path.join(__dirname, 'www'),
    assets: path.join(__dirname, 'www/assets'),
    host: '192.168.1.130',
    port: 3000,
  },
  paths: {
    root: __dirname,
    styles: path.join(__dirname, 'src/styles/'),
    stylesSvgSprite: path.join(__dirname, 'src/styles/generated/'),
    stylesAll: path.join(__dirname, 'src/styles/**/*.scss'),
    stylesBase: path.join(__dirname, 'src/styles/base.scss'),
    stylesSvg: path.join(__dirname, 'src/styles/svg.scss'),
    scripts: path.join(__dirname, 'src/scripts/terminal.js'),
    scriptsAll: path.join(__dirname, 'src/scripts/**/*.js'),
    pages: path.join(__dirname, 'src/pages/*.+(html|njk)'),
    pagesAll: path.join(__dirname, 'src/pages/**/*.+(html|njk)'),
    icons: path.join(__dirname, 'src/assets/icons/*.svg'),
    svgTemplate: path.join(__dirname, 'src/lib/svg-task-templates/svg-sprite.mustache'),
    svgAll: path.join(__dirname, 'src/assets/icons/*.svg'),
    svgFilters: path.join(__dirname, 'src/assets/filters/'),
    svgLayoutTemplate: path.join(__dirname, 'src/lib/svg-task-templates/svg-sprite-layout.svg'),
    svgStylesTemplate: path.join(__dirname, 'src/lib/svg-task-templates/svg-sprite-styles.svg'),
    svgDefs: path.join(__dirname, 'src/assets/defs.svg'),
    datasets: 'datasets',
  },
};
