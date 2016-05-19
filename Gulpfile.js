'use strict';

// Node/Gulp plugins
const gulp    = require('gulp');
const merge   = require('merge-stream');
const plugins = require('gulp-load-plugins')({ camelize: true });
const through = require('through2');

// CSS task
gulp.task('styles', () => {
  return gulp.src('src/scss/main.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({ outputStyle: 'compressed' }))
    .pipe(plugins.postcss([
      require('autoprefixer')({ browsers: ['last 2 versions'] })
    ]))
    .pipe(plugins.rename('styles.min.css'))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/css'))
    .pipe(plugins.size({ title: 'styles' }));
});

// Scripts task
gulp.task('scripts', () => {
  return gulp.src(['src/js/**/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/js'))
    .pipe(plugins.size({ title: 'scripts' }));
})

// Optimizes images
gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(plugins.plumber())
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [require('imagemin-pngquant')()]
    }))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest('dist/img'))
    .pipe(plugins.size({ title: 'images' }));
});

// Build task
gulp.task('build', ['styles', 'scripts', 'images']);

// Watch task
gulp.task('watch', () => {
  gulp.watch(['src/img/**/*'], ['images']);
  gulp.watch(['src/css/**/*.css'], ['styles']);
  gulp.watch(['src/js/**/*.js'], ['scripts']);
});

// Default task
gulp.task('default', ['build', 'watch']);
