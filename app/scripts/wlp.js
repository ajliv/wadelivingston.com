/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap : ['jquery']
    },
    paths: {
        jquery     : '../bower_components/jquery/dist/jquery',
        backbone   : '../bower_components/backbone/backbone',
        underscore : '../bower_components/lodash/dist/lodash',
        bootstrap  : '../bower_components/bootstrap/dist/js/bootstrap',
        photoswipe : '../bower_components/photoswipe/dist/photoswipe',
        slick      : '../bower_components/slick-carousel/slick/slick'
    }
});

require([
    'backbone',
    'views/app',
    'bootstrap'
], function (Backbone, AppView) {
    var WLP = window.WLP = {};

    WLP.App = new AppView();

    Backbone.history.start();
});
