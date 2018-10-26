# Default SDK for markup projects

The project set up for using with next techs:
- Gulp v4.0;
- Bootstrap v4.1.x;
- Scss;
- Nunjucks template engine;
- Webpack as JS bundler;
- Babel as JS compiler;

## Project structure

Default project has exact or similar structure:

``` bash
.
├── datasets
├── src
│   ├── assets
│   │   └── icons # SVG icons
│   ├── lib # Gulp tasks' files
│   ├── pages # Pages' templates
│   │   ├── index.njk
│   │   └── templates
│   │       ├── blocks
│   │       ├── lib
│   │       ├── partials
│   │       └── layout.njk
│   ├── scripts
│   └── styles
│       ├── base.scss
│       ├── blocks
│       ├── bootfix # Contains overriding or complementing styles for bs  
│       ├── _fonts.scss
│       ├── generated
│       ├── helpers
│       ├── pages
│       ├── vendor
│       └── variables
├── tasks
├── gulpfile.babel.js
└── README.md
```

### Datasets
Contains .json files, which could be used as a data for Nunjucks templates. Loads up automatically after starting gulp.

### SVG sprite

SVG sprite will be generated with all SVG files located in `src/assets/icons`. After sprite generation, the file (`src/styles/generated/_sprite.scss`) will be created, which contains specific rules for each icon. This file must not be customized. To override common styles for such an icon use `src/styles/generated/_sprite-custom.scss` file.

Try to use icons without inline styles (they will be wiped out) and definitely do not place a complicated geometric figure in the icons' folder.

### Pages
Static pages will be generated from 1st lvl descendants of `src/pages/` folder. For instance, file with path `src/pages/index.njk` will be processed directly into the `www/` folder.

The project **doesn't** set up for creating **complex folder structure** in the destination folder.

All files from the `src/pages/templates/` folder could be @included, @extended, or @imported.

The suggested logic for defining which subfolder should be used as a place for storing one or the other file is:
- **Blocks** folder contains only macroses of independent custom blocks. Such blocks must not use any of a griding or positioning styles. Examples: all kinds of cards, badges, buttons, so on.
- **Partials** folder consists of semantically related blocks of code, which could be @included, try to use macroses from `../blocks` and `../lib` here with bs grid. Examples: footer, navbar, header, cards section.
- **Lib** folder intended to be used as a storing unit of specific markup snippets for usage with vendors' JS-plugins or styles. Also could contain helpers.

Moreover, pages' templates are kind of a big "partials" themselves, so could include all available macroses and grid styles.

**Warning**: In spite of using BEM-like naming for styles, pages' block are not the only BEM-blocks. Some partials (for example, header) could be a bem-blocks too. __This entities__(bem-blocks and pages' blocks) __are not fully related__ and shouldn't be treated as the same thing.

### Styles
The BEM-naming concept is preferable for use. Example of using convention:

``` css
.block-name__elem-name--mod-name--mod-val
```

Styles folder despite having various subfolders contains only three notable ones: blocks, generated and bootfix.

'Generated' folder contains of automatically generated files. For example, svgSprite task generates `_.sprite.scss` file, which contains styles for each svg symbol from sprite. To customize generated files use the file which name consists of generated file's name and postfix `-custom`.

'Blocks' folder is for blocks' styles in bem notation. Which why it's structure could be drastically different from project to project. Besides flat structure for light projects, you could create 'layout' and 'blocks' folders inside and use 'em for different types of blocks, or you could create a folder for each block (or just for big ones) and split styles of a block to several files. **Store here only custom blocks' styles**.

'Bootfix' folder includes bs customization styles. Uncomment various components in '_base.scss' to include them in a project. Uncomment and change variables in `_variables.scss` to customize the bootstrap.  To expand bs styles (by adding extra styles for a component or by adding a whole new component-like class) or to override some just create a respective file for a customizing component and import it in the `_custom.scss` file.

Note: the bootstrap doesn't use BEM-like naming, so to keep it clean and not making a mess just use bs's naming convention for additional bs styles.

``` scss
/* Custom Block */
.card {
  &__body {
    /* ... */
  }

  &__img {
    /* ... */

    &--p {
      &--top {
        /* ... */
      }

      &--bottom {
        /* ... */
      }
    }
  }
}

/* If using and customizing the bs's component */

.card {
  &-card {

  }

  &-img-top {

  }

  &-img-bottom {

  }
}
```
