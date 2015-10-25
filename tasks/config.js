'use strict';

var _ = require('lodash');
var url = require('url');
var proxy = require('proxy-middleware');

var baseFileName = 'wlp';
var config = {};

var paths = {};
paths.src = './src';
paths.dist = './dist';
paths.npm = './node_modules';
config.paths = paths;

var proxies = []; /*[{
    from: 'http://www.adultswim.com/tools/',
    to: '/tools'
}];*/

var middleware = _.map(proxies, function (p) {
    var prxy = url.parse(p.from);
    prxy.route = p.to;
    return proxy(prxy);
});


config.browserSync = {
    port: 8080,
    server: {
        baseDir: paths.dist,
        middleware: middleware
    }
};

config.fonts = {
    src: [
        paths.npm + '/font-awesome/fonts/**/*',
        paths.npm + '/bootstrap/fonts/**/*'
    ],
    dist: paths.dist + '/fonts'
};

config.lib = {
    src: [],
    dist: paths.dist + '/scripts/lib'
}

config.markup = {
    src: paths.src + '/**/*.html',
    watchSrc: paths.src + '/**/*.html',
    dist: paths.dist
};

config.scripts = {
    dist: paths.dist + '/js',
    src: paths.src + '/scripts/' + baseFileName + '.js',
    outputName: baseFileName + '.js',
    watchSrc: paths.src + '/scripts/**/*.{js,ejs}',
    lintSettings: {
        src: paths.src + '/scripts/**/*.js'
    }
};

config.styles = {
    dist: paths.dist + '/css',
    src: paths.src + '/styles/' + baseFileName + '.less',
    watchSrc: paths.src + '/styles/**/*.less',
    lessSettings: {
        paths: [
            paths.npm
        ]
    }
};

module.exports = config;
