'use strict';
    const   gulp = require('gulp'),
            sass = require('gulp-sass'),
            autoprefixer = require('gulp-autoprefixer'),
            browserSync = require('browser-sync').create(),
            babel = require('gulp-babel');

    gulp.task('js', (done) => {
        return gulp.src('./scripts/es6/*.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('./scripts/app'));
    });
    gulp.task('sass', () =>{
        return gulp.src('./styles/scss/**/*.scss')
            .pipe(sass().on('Error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
            .pipe(browserSync.stream())
            .pipe(gulp.dest('./styles/css'));
    });
    gulp.task('js-watch', ['js'], (done) =>{
        browserSync.reload();
        done();
    });
    gulp.task('server', ['sass'], () =>{
        browserSync.init({
        server: {
            baseDir: "./"
        }
        });
        gulp.watch('./styles/scss/*.scss', ['sass']);
        gulp.watch('./scripts/es6/*.js', ['js']);
        gulp.watch('./scripts/es6/*.js', ['js-watch']);
        gulp.watch("./*.html").on('change', browserSync.reload);
    });
    gulp.task('default', ['server']);