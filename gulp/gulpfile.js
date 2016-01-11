var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('../sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../public/stylesheets'))
})

gulp.task('concat', function () {
  return gulp.src('../public/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('../public/dist'))   
})

//need ES6 plugin
// gulp.task('compress', function () {
//   return gulp.src('../dist/all.js')
//     .pipe(uglify().on('error', function (e){
//       console.log(e)
//       })
//     )
//     .pipe(gulp.dest('../dist'))
// })

// gulp.task('rename', function () {
//   return gulp.src('../dist/all.js')
//     .pipe(rename('all.min.js'))
//     .pipe(gulp.dest('../dist'));
// })

gulp.task('watch', function () {
  gulp.watch('../public/js/*.js', ['concat']);
  gulp.watch('../sass/*.scss', ['sass']);
})

gulp.task('default', ['concat', 'sass', 'watch']);