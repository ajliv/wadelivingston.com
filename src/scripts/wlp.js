'use strict';

var $ = require('jquery');
global.$ = $;

var Backbone = require('backbone');
Backbone.$ = $;

var PhotosetCollection = require('./collections/photoset');
var LayoutView = require('./views/layout');

$(function () {
    var photosets = new PhotosetCollection();
    
    new LayoutView({ collection: photosets });

    photosets.fetch({ reset: true });
    
    Backbone.history.start();
});
