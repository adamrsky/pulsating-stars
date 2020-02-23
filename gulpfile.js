const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const beautify = require('gulp-beautify');
const webserver = require('gulp-webserver');

// Set sass comipler
sass.compiler = require('node-sass');

gulp.task('sass', () => {
  return gulp.src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(beautify.css({ indent_size: 2 }))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('views', () => {
  return gulp.src('./src/*.pug')
    .pipe(pug({}))
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'));
});

gulp.task('start', done => {
  gulp.watch(["./src/*.scss"], gulp.series('sass'));
  gulp.watch(["./src/*.pug"], gulp.series('views'));
  gulp.watch(["./src/js/*.js"], gulp.series('js'));
  gulp.src('./public/')
    .pipe(webserver({
      host: "localhost",
      port: 8080,
      fallback: "./index.html",
      livereload: true
    }));
});
