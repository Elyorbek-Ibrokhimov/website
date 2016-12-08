var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

gulp.task('start', function () {
  nodemon({
    script:'app/app.js',
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  })
})

gulp.task('html', () => {
  gulp.src('client/index.html')
    .pipe(gulp.dest('app/dist'))
})

gulp.task('css', () => {
  gulp.src('client/app/css/**/*.css')
    .pipe(gulp.dest('app/dist/public/css'))
})

gulp.task('assets', () => {
  gulp.src('client/app/images/**')
    .pipe(gulp.dest('app/dist/public/images'))
})

gulp.task('watch', function () {
  gulp.watch('client/index.html', ['html']);
  gulp.watch('client/app/css/**/*.css', ['css']);
  gulp.watch('client/app/images/**', ['assets']);
})

gulp.task('default', ['html', 'css', 'assets', 'start', 'watch']);