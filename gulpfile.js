var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');

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
});

gulp.task('sass', () => {
  gulp.src('client/app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('server/dist/public/stylesheets'))
});

gulp.task('scripts', () => {
  gulp.src('client/app/js/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('server/dist/public/js'));
});

gulp.task('vendor', () => {
  gulp.src('client/vendor/**')
    .pipe(gulp.dest('server/dist/vendor'));
});

gulp.task('watch', function () {
  gulp.watch('client/index.html', ['html']);
  gulp.watch('client/app/js/**/*.js', ['scripts']);
  gulp.watch('sass/**/*.scss', ['sass']);
})

gulp.task('default', ['develop', 'html', 'vendor', 'scripts', 'sass', 'watch']);


















