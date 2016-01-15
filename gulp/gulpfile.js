var gulp = require('gulp');
    babel = require('gulp-babel');
    uglify = require('gulp-uglify');
    concat = require('gulp-concat');
    sass = require('gulp-sass');
    jshint = require('gulp-jshint');
    nodemon = require('gulp-nodemon');

// gulp.task('develop', function () {
//   nodemon({
//     script: '../app.js',
//     ext: 'js html',
//     env: { 'NODE_ENV': 'development' }
//   })
// })

// gulp.task('lint', () => {
//   gulp.src('../public/js/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
// })

gulp.task('script', () => {
  return gulp.src('../public/js/*.js')
    .pipe(babel({presets:['es2015']}))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../public/dist'))   
})

gulp.task('sass', () => {
  return gulp.src('../sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../public/stylesheets'))
})

gulp.task('watch', function () {
  gulp.watch('../public/js/*.js', ['script']);
  gulp.watch('../sass/**/*.scss', ['sass']);
})

gulp.task('default', ['script', 'sass', 'watch']);