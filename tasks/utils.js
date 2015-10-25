'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');


module.exports = {
    handleErrors: function () {
        var args = Array.prototype.slice.call(arguments);

        // Send error to notification center with gulp-notify
        notify.onError({
            title: 'Compile Error',
            message: '<%= error %>'
        }).apply(this, args);

        // Keep gulp from hanging on this task
        this.emit('end');
    }
};
