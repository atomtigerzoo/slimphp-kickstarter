/*
 * Main gulp file for all actions
 *
 * @version 0.2
 */


// Load config
const gulpconfig = require('./gulpconfig.json');


/*
 * Configuration
 */
const config = {
  // This is the filename of your main SASS file.
  // Edit the filename (/assets/sass/styles.theme.scss) and reference
  // in /header.php accordingly if you change the name here!
  styleName: 'styles',

  // URl to proxy for browsersync
  proxyUrl: gulpconfig.browserSync.proxyUrl
};


/*
 * Paths
 */
const path = {
  src:        './',
  sass:       './app/assets/sass',
  js:         './app/assets/js',
  css:        './public/css',
  jsBuild:    './public/js',
  fonts:      './public/fonts',

  bower:      './bower_components',

  // Public folder
  public: './public'
};


/*
 * ++++ Gulp and plugins
 */

// Load gulp and plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const pngquant = require('imagemin-pngquant');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// Autoload other gulp plugins
const plugins = require('gulp-load-plugins')();


/*
 * ++++ Task runners
 * Please see the tasks at the bottom of this file!
 */

/*
 * Copy fonts from bower folder to src
 * Add all font directories you want to keep in sync
 */
gulp.task('fontSync', () =>
  gulp.src([
    // path.bower + '/fontawesome/fonts/**.*'
  ])
  .pipe(gulp.dest(path.fonts))
);


/*
 * Run all transpile tasks
 */
gulp.task('babel', ['babelConcatMainJS', 'babelConcatBackendJS'], () =>
  gulp
);


/*
 * Transpile/concat user javascript
 */
gulp.task('babelConcatMainJS', () =>
  gulp.src([
    `${path.js}/**/*.js`,
    // Exclude files or folders that should not be transpiled:
    `!${path.js}/backend/*`
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('app.js'))
  .pipe(plugins.uglify({ compress: true }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.jsBuild))

  .pipe(browserSync.stream())
);


/*
 * Transpile/concat backend javascript
 */
gulp.task('babelConcatBackendJS', () =>
  gulp.src([
    //`${path.js}/**/*.js`,
    // Exclude files or folders that should not be transpiled:
    //`!${path.js}/some.js`
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('app.backend.js'))
  .pipe(plugins.uglify({ compress: true }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.jsBuild))

  .pipe(browserSync.stream())
);


/*
 * Concat & compact vendor javascripts
 * Add all vendor scripts here and they will be used on each gulp startup.
 * Scripts will be used in the order given here.
 */
gulp.task('concatVendorJS', () =>
  gulp.src([
    //`${path.bower}/jquery/dist/jquery.js`,
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('vendors.js'))
  .pipe(plugins.uglify({ compress: true }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.jsBuild))
);


/*
 * SASS compile and create sourcemaps
 */
gulp.task('sassCompile', () =>
  gulp.src(`${path.sass}/${config.styleName}.scss`)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
        precision: 5,
      })
      .on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.css))

    .pipe(browserSync.stream())
);


/*
 * Optimise images
 */
gulp.task('imageOptimise', () =>
  gulp.src(`${path.public}/img/**/*`)
    .pipe(plugins.imagemin({
      // JPG
      progressive: true,
      // SVG
      multipass: false,
      svgoPlugins: [{ removeViewBox: false }],
      // PNG
      optimizationLevel: 3,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(`${path.public}/img/`))
);


/*
 * Update version parameter for scripts
 */
gulp.task('updateScriptsVersion', ['babel'], () => {
  const d = new Date();

  const buildDate = d.getFullYear() +
                (`0${d.getMonth() + 1}`).slice(-2) +
                (`0${d.getDate()}`).slice(-2) +
                (`0${d.getHours()}`).slice(-2) +
                (`0${d.getMinutes()}`).slice(-2);

  return gulp.src(`${path.src}/app/templates/layouts/default.partial.scripts.twig`)
    .pipe(plugins.replace('?v=DEV', `?v=${buildDate}`))
    .pipe(plugins.rename('default.partial.scripts.build.twig'))
    .pipe(gulp.dest(`${path.src}/app/templates/layouts/`));
});


/*
 * Update version parameter for styles
 */
gulp.task('updateStylesVersion', ['sassCompile'], () => {
  const d = new Date();

  const buildDate = d.getFullYear() +
                (`0${d.getMonth() + 1}`).slice(-2) +
                (`0${d.getDate()}`).slice(-2) +
                (`0${d.getHours()}`).slice(-2) +
                (`0${d.getMinutes()}`).slice(-2);

  return gulp.src(`${path.src}/app/templates/layouts/default.partial.styles.twig`)
    .pipe(plugins.replace('?v=DEV', `?v=${buildDate}`))
    .pipe(plugins.rename('default.partial.styles.build.twig'))
    .pipe(gulp.dest(`${path.src}/app/templates/layouts/`));
});


/*
 * ++++ Task runners
 */


/*
 * Default
 * Compile, transpile, copy fonts and serve the browsersync
 * version of the theme for development.
 */
gulp.task('default', ['fontSync', 'concatVendorJS', 'babel', 'sassCompile'], () => {
  browserSync.init({
    proxy: config.proxyUrl,
    notify: false // change to true, if you like the overlay on change/reload
  });
  
  gulp.watch(`${path.sass}/**/*.scss`, ['sassCompile']);
  gulp.watch(`${path.js}/**/*.js`, ['babel']);

  gulp.watch([
    `${path.src}/app/**/*`,
    
    // Public folder
    `${path.public}/**/*`,
    
    // Exclude folders/files from watch task here:
    `!${path.js}/**/*`,
    `!${path.sass}/**/*`,
    `!${path.bower}/**/*`,
    `!${path.src}/app/tests/**/*`,
    `!${path.src}/logs/**/*`,
    `!${path.public}/entry-img/**/*`
  ]).on('change', browserSync.reload);
});


/*
 * Build task
 */
gulp.task('build', [
  'fontSync',
  'concatVendorJS',
  'babel',
  'sassCompile',
  'updateScriptsVersion',
  'updateStylesVersion',
  'imageOptimise'
]);
