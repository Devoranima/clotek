//Adding gulp modules
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require ('gulp-autoprefixer');
const cleanCSS = require ('gulp-clean-css');
//const uglify = require('gulp-uglify');
const uglify = require('gulp-terser');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const del = require('gulp-clean');
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');
const order = require('gulp-order');

/*
//List of input CSS files
const cssFiles = [
  './src/css/main.css',
  './src/css/media.css'
]

//List of input JS files
const jsFiles = [
  './src/js/main.js',
  './src/js/script.js'
]
*/

const scssPath = [
  './src/files/scss/main.scss',
  './src/files/scss/!(main|media).scss',
  './src/files/scss/media.scss'
]


//SASS task function
function styles_scss(){
  cssClean();
  //Files source
  return gulp.src('./src/files/scss/*.scss')
  //Adding sourcemaps
  .pipe(sourcemaps.init())
  //Logging errors 
  .pipe(sass().on('error', sass.logError))
  //Writing sourcemaps in root dir
  .pipe(sourcemaps.write('./'))
  //Destination
  .pipe(gulp.dest('./src/files/css/'))
}

//CSS task function
function styles(){
  //Files source
  return gulp.src('./src/files/css/*.css')
  .pipe(order(['**.*']))
  //Concatination
  .pipe(concat('styles.css'))
  //Prefixes
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade:false
  }))
  //Clean CSS
  .pipe(cleanCSS({
    level: 2
  }))
  //Destination
  .pipe(gulp.dest('./build/css'))
  //Syncronizing files
  .pipe(browserSync.stream());
}

//JS task function
function scripts(){
  //Files source
  return gulp.src('./src/files/js/*.js')
  //Concat
  .pipe(concat('scripts.js'))
  //Uglification
  .pipe(uglify({
    toplevel:true
  }))
  //Destination
  .pipe(gulp.dest('./build/js'))
  //Syncronizing files
  .pipe(browserSync.stream());
}

function html(){
  return gulp.src('./src/*.html')
  .pipe(fileInclude())
  .pipe(replace(/@img\//g, 'img/'))
  .pipe(gulp.dest('./build/'))
  .pipe(browserSync.stream());
}

function img(){
  return gulp.src('./src/img/**/*.*')
  .pipe(gulp.dest('./build/img'))
  .pipe(browserSync.stream());
}

//Cleaning function
function clean(){
  return gulp.src('./build/*', {read: false})
  .pipe(del());
}

function cssClean(){
  return gulp.src('./src/files/css/*', {read:false})
  .pipe(del());
}

//Watching for files changes
function watch () {
  browserSync.init({
    server:{
      baseDir:"./build/"
    }
  });
  //Watch scss files
  gulp.watch('./src/files/scss/**/*.scss', styles_scss)
  //Watch css files
  gulp.watch('./src/files/css/**/*.css', styles)
  //Watch js files
  gulp.watch('./src/files/js/**/*.js', scripts)
  //Watch HTML files
  gulp.watch("./src/**/*.html", html)
  //Watch IMG folder
  gulp.watch('./src/files/img/**/*.png', img)
  gulp.watch('./src/files/img/**/*.jpg', img)
  gulp.watch('./src/files/img/**/*.svg', img)

}


const build_foo = gulp.series(clean, styles_scss, html, gulp.parallel(img, styles, scripts));



//Watch task
gulp.task('watch', watch);
//Building project: cleaning folder, creating CSS and JS files
gulp.task('build', build_foo);

const dev_foo = gulp.series('build', 'watch');
//Pushing build and watching for changes
gulp.task('dev', dev_foo);
