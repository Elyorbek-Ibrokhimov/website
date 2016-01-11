var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

gulp.task('lint', () => {
  gulp.src('../public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
})

gulp.task('script', () => {
  return gulp.src('../public/js/*.js')
    .pipe(babel({presets:['es2015']}))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../public/dist'))   
})

gulp.task('sass', () => {
  return gulp.src('../sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../public/stylesheets'))
})

gulp.task('watch', function () {
  gulp.watch('../public/js/*.js', ['lint','script']);
  gulp.watch('../sass/*.scss', ['sass']);
})

gulp.task('default', ['lint', 'script', 'sass', 'watch']);