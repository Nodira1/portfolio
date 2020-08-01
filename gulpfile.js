var gulp = require('gulp');                     
var autoprefixer = require('gulp-autoprefixer'); // prefesklar uchun yani fex-
var csso = require('gulp-csso');                // bitta qatorga uchun 
var rename = require("gulp-rename");                // min qiladi 
var gcmq = require('gulp-group-css-media-queries'); // medialar uchun deyman 
var watch = require('gulp-watch');                  // kuzatish uchun 
var browserSync = require('browser-sync').create();  // app papkasini kuzatadi
var plumber = require('gulp-plumber');                  // yani serveri hato boganda o'chirmaydi    
var sourcemaps = require('gulp-sourcemaps');            // hartita 
var less = require('gulp-less');
var include = require('gulp-include')


gulp.task('style', style);

function style () {
    return gulp.src('./Violet/precss/style.less')
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(less())
            .pipe(include())
            .pipe(autoprefixer({
                browsers: ['last 50 versions'],
                cascade: false
            }))
           .pipe(gcmq())
           .pipe(gulp.dest('./Violet/css'))
           .pipe(csso())
           .pipe(rename({
            suffix: ".min",
            }))
           .pipe(sourcemaps.write('.'))
           .pipe(gulp.dest('./Violet/css'))
           .pipe(browserSync.stream());
}

gulp.task('watch', function () {
    watch("./Violet/precss/**/*.less", style);
    watch("./Violet/index.html", browserSync.reload);
    watch("./Violet/js/script.js", browserSync.reload);
    watch("./Violet/images/*.*", browserSync.reload);
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./Violet"
        }
    });
});

gulp.task('default' , gulp.parallel("style", "watch", "server"));



