const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

function style () {
    return gulp.src('./src/sass/**/*.sass')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./docs/css'))
            .pipe(browserSync.stream())
}

function pugCompile () {
    return gulp.src('./src/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./docs/'))
    .pipe(browserSync.stream())
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './docs'
        }
    })
    gulp.watch('./src/sass/**/*.sass', style);
    gulp.watch('./src/*.pug', pugCompile);
    // gulp.watch('./docs/*.html').on('change', browserSync.reload); //for clean html only
}

gulp.task('default', function () {
    watch(); //for gulp start
})

exports.watch = watch; //for gulp watch start
exports.pug = pugCompile;