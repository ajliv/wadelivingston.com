'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('./config');

gulp.task('watch', ['serve'], function () {
    watch(config.markup.watchSrc, function () {
        gulp.start('markup');
    });
    watch(config.scripts.watchSrc, function () {
        gulp.start('scripts');
    });
    watch(config.styles.watchSrc, function () {
        gulp.start('styles');
    });
});
