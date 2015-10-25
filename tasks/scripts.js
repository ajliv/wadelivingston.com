'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var reload = require('browser-sync').reload;
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var config = require('./config').scripts;
var utils = require('./utils');


gulp.task('scripts:lint', function () {
    return gulp.src( config.lintSettings.src )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') )
        .pipe( jshint.reporter('fail') )
        .on( 'error', utils.handleErrors );
});

gulp.task('scripts:browserify', ['scripts:lint'], function () {
    del( config.dist + '/**/*' );

    return browserify(config.src).bundle()
        .on( 'error', utils.handleErrors )
        .pipe( source(config.outputName) )
        .pipe( gulp.dest(config.dist) );
});

gulp.task('scripts:uglify', ['scripts:browserify'], function () {
    return gulp.src( config.dist + '/**/*.js' )
        .pipe( sourcemaps.init() )
        .pipe( uglify() )
        .on( 'error', utils.handleErrors )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( sourcemaps.write('./', { includeContent: false }) )
        .pipe( gulp.dest( config.dist ) );
});

gulp.task('scripts', ['scripts:uglify'], function () {
    return gulp.src( config.dist + '/**/*.js' )
        .pipe( reload({ stream: true }) );
});