var gulp = require('gulp'),
    less = require('gulp-less'),
    lint = require('gulp-jshint'),
    concat = require('gulp-concat'),
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

gulp.task('lint', function(){
  gulp.src([
    './public/common/*.js',
    './public/app/comics/*.js',
    './public/app/creators/*.js',
    './public/app/app.js'
  ])
  .pipe(lint())
  .pipe(lint.reporter('default'));
});

gulp.task('bundle', function(){
  gulp.src([
    './public/common/*.js',
    './public/app/comics/*.js',
    './public/app/creators/*.js',
    './public/app/app.js' 
    ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('deploy', ['less', 'lint', 'bundle'])
gulp.task('default', ['less', 'lint']);