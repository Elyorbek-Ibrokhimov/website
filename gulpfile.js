var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({
    script: 'app.js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('script', () => {
  gulp.src('public/js/*.js')
    .pipe(babel({presets:['es2015']}))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))   
})

gulp.task('sass', () => {
  gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
})

gulp.task('default', ['develop','script', 'sass', 'watch']);