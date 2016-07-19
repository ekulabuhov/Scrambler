var gulp = require('gulp');
var typescript = require('gulp-tsc');
var http = require('http');
var ecstatic = require('ecstatic');

gulp.task('default', function(){
  http.createServer(
    ecstatic({ root: __dirname + '/dist' })
  ).listen(8081);

  console.log('Listening on :8081');
  //gulp.watch('./src/*.ts', ['compile']);
});

gulp.task('compile', function(){
  gulp.src(['./src/*.ts'])
    .pipe(typescript({target:'ES5'}))
    .pipe(gulp.dest('dist/'))
  
  gulp.src(['*.htm*', '*.css'])
    .pipe(gulp.dest('dist/'))
    
  gulp.src('src/vendor/**/*.*')
    .pipe(gulp.dest('dist/vendor'));
    
  gulp.src('resources/**/*.*')
    .pipe(gulp.dest('dist/resources'));
});