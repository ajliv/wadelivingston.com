'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var PhotosetCollection = require('./collections/photoset');
var LayoutView = require('./views/layout');

$(function () {
    var photosets = new PhotosetCollection();
    
    new LayoutView({ collection: photosets });

    $.ajax('http://i.wadelivingston.com/data/photosets.json')
        .done(function (data) {
            photosets.reset(data);
            console.log(photosets.toJSON());
        });
    
    Backbone.history.start();
});
