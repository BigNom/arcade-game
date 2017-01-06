// Modules and Plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var connect = require('connect');
var serve = require('serve-static');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var beeper = require('beeper');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

//Error Helper
function onError(err) {
  beeper();
  console.log(err);
}

// Styles Task
gulp.task('styles', function() {
    return gulp.src('app/css/*.css')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(concat('style.css'))
        .pipe(myth())
        .pipe(gulp.dest('dist/css'));
});

// Scripts Task
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
         .pipe(plumber({
          errorHandler: onError
        }))
         .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  // .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/js'));
});

// Images Task
gulp.task('images', function() {
  return gulp.src('app/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
  });

// Server Task
gulp.task('server', function() {
  return connect().use(serve(__dirname))
  .listen(8080)
  .on('listening', function() {
    console.log('Server Running: View at http://localhost:8080');
  });
});

// Browsersync Task
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir:'./'
    }
  }, cb);
});

// Browserify Task
gulp.task('browserify', function() {
  return browserify('./app/js/app.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

// Clean task
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('app/css/*.css', gulp.series('styles',
    browsersync.reload));
  gulp.watch('app/js/*.js', gulp.series('scripts',
    browsersync.reload));
  gulp.watch('app/images/*', gulp.series('images',
    browsersync.reload));
 });

// Default Task
gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'browsersync', 'watch'));







