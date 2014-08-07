var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('develop', function () {
  process.env.NODE_ENV = 'dev';
  nodemon({ script: 'server.js', ext: 'less html js', ignore: ['node_modules/', 'test/'] })
    .on('change', ['less'])
    .on('restart', function () {
      console.log('restarted!');
      livereload();
    })
});

gulp.task('default', ['less']);