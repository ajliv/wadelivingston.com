'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var reload = require('browser-sync').reload;
var rename = require('gulp-rename');

var config = require('./config').styles;
var utils = require('./utils');


gulp.task('styles:less', function () {
    del( config.dist + '/**/*' );
    return gulp.src( config.src )
        .pipe( less(config.lessSettings) )
        .on( 'error', utils.handleErrors )
        .pipe( autoprefixer() )
        .pipe( gulp.dest(config.dist) );
});

gulp.task('styles:minify', ['styles:less'], function () {
    return gulp.src( config.dist + '/**/*.css' )
        .pipe( minify() )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( gulp.dest(config.dist) );
});


gulp.task('styles', ['styles:minify'], function () {
    return gulp.src( config.dist + '/**/*.css' )
        .pipe( reload({ stream: true }) );
});
