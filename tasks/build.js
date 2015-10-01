'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('build:clean', function (callback) {
    del(config.paths.dist, callback);
});

gulp.task('build', ['fonts', 'markup', 'scripts', 'lib', 'styles']);
