'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./config').browserSync;

gulp.task('serve', ['build'], function () {
    browserSync(config);
});
