'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed');
var reload = require('browser-sync').reload;

var config = require('./config').fonts;

gulp.task('fonts', function () {
    return gulp.src( config.src )
        .pipe( changed(config.dist) )
        .pipe( gulp.dest(config.dist) )
        .pipe( reload({ stream: true }) );
});
