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

function sassConcat(){
  cssClean();
  return gulp.src('./src/files/scss/*.scss')
  //Ordering items
  .pipe(order(['**.*']))
  //Files concat
  .pipe(concat('styles.scss'))
  //Destination
  .pipe(gulp.dest('./src/files/css/'))

  .pipe(sourcemaps.init())
  //Logging errors 
  .pipe(sass().on('error', sass.logError))
  //Writing sourcemaps in root dir
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/files/css/'))
  
}

function sassToCss (){
  return gulp.src('./src/files/css/styles.css')
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
  //Uglification
  .pipe(uglify({
    toplevel:true
  }))
  //Destination
  .pipe(gulp.dest('./build/js'))
  //Syncronizing files
  .pipe(browserSync.stream());
}

function php(){
  return gulp.src('./src/files/php/*.php')
  .pipe(gulp.dest('./build/php/'))
  .pipe(browserSync.stream())
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
  gulp.watch('./src/files/scss/**/*.scss', sassConcat)
  //Watch scss file
  gulp.watch('./src/files/css/styles.scss', sassToCss)
  //Watch js files
  gulp.watch('./src/files/js/**/*.js', scripts)
  //Watch HTML files
  gulp.watch("./src/**/*.html", html)
  //Watch IMG folder
  gulp.watch('./src/files/img/**/*.png', img)
  gulp.watch('./src/files/img/**/*.jpg', img)
  gulp.watch('./src/files/img/**/*.svg', img)
  gulp.watch('./src/files/php/*.php', php)

}


const build_foo = gulp.series(clean, sassConcat, html, gulp.parallel(img, sassToCss, scripts, php));



//Watch task
gulp.task('watch', watch);
//Building project: cleaning folder, creating CSS and JS files
gulp.task('build', build_foo);

const dev_foo = gulp.series('build', 'watch');
//Pushing build and watching for changes
gulp.task('dev', dev_foo);
