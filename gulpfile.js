var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function () {
  nodemon({
    script: 'server/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('html', () => {
  gulp.src('client/index.html')
    .pipe(gulp.dest('server'));
})

gulp.task('sass', () => {
  gulp.src('client/app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('server/dist/public/stylesheets'))
})

gulp.task('scripts', () => {
  gulp.src('public/js/*.js')
    .pipe(babel({presets:['es2015']}))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'))   
})



gulp.task('watch', function () {
  gulp.watch('client/index.html', ['html'])
  gulp.watch('sass/**/*.scss', ['sass']);
})

gulp.task('default', ['develop', 'html', 'sass', 'watch']);