var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

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

gulp.task('default', ['concat']);