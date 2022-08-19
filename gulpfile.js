//npm install --save-dev gulp gulp-sass sass gulp-concat gulp-terser gulp-cssnano gulp-autoprefixer browser-sync

//initializing modules
const 
      gulp         = require('gulp'),
      sass         = require('gulp-sass') (require('sass')),
      concat       = require('gulp-concat'),
      cssnano      = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      browsersync  = require('browser-sync').create(),
      reload       = browsersync.reload;


//file path variables
const files = {
  html  :  ['*.html'], 
  scss  :  ['src/scss/style.scss', 'src/scss/**/*.scss', 'dist/css/']
}


//scss to css task
const scssMini = () => {
  return gulp.src(['src/css/bootstrap-grid.min.css',files.scss[0]], {sourcemaps: true })
              .pipe(sass().on('error', sass.logError))
              .pipe(autoprefixer({overrideBrowserslist : ['last 2 versions']}))
              .pipe(concat('style.min.css'))
              .pipe(cssnano())
            .pipe(gulp.dest(files.scss[2], {sourcemaps: '.' }));
}

//scss to css watcher task
const watchScss = () => {
  scssMini();
  return gulp.watch(files.scss[1], scssMini);
}

//browsersync tasks
const browsersyncServe = () => {
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
}


//default watcher task
const mainTask = () => {
  scssMini();
  browsersyncServe();
  gulp.watch(files.html[0]).on('change', reload); 
  gulp.watch(files.scss[1]).on('change', gulp.series(scssMini, reload));
}
 
exports.scss    = watchScss;       //run this command for scss task only
exports.default = mainTask;        //default command that runs everything
