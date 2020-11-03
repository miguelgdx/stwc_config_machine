var gulp = require('gulp');
var browserSync = require('browser-sync').create(); //paquete a utilizar
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('styles', function(done){
  gulp.src(['./src/sass/*.scss', './src/sass/**/*.scss'])
      .pipe(sass.sync({outputStyle: 'compressed'}))
      .pipe(gulp.dest('./src/styles/'))
      .pipe(sourcemaps.init())
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/styles'))
      .pipe(browserSync.stream());
  console.log("Ejecutado styles");
  done();
});

gulp.task('browser-sync', function() {
 browserSync.init({
 server: {
 baseDir: "./"
 }
 });
});

gulp.watch("./src/sass/*.scss", gulp.series('styles'));
gulp.watch("*.html").on("change", browserSync.reload);
