'use strict';

var _ = require('lodash');
var Backbone = require('backbone');
var PhotosetModel = require('../models/photoset');

module.exports = Backbone.Collection.extend({

    url: 'http://i.wadelivingston.com/data/photosets.json',

    model: PhotosetModel,

    parse: function (response) {
        var offset = 0;
        var photosets = response;

        photosets = _(photosets).map(function (photoset) {
            photoset.photos = _(photoset.photos).map(function (photo) {
                return _.extend(photo, {
                    _parent: photoset._id,
                    _parentTitle: photoset.title,
                    src: photo.sizes.large.src,
                    msrc: photo.sizes.small.src,
                    w: photo.sizes.large.width,
                    h: photo.sizes.large.height
                });
            }).value();

            photoset.offset = offset;
            offset += photoset.photos.length;

            return photoset;
        }).value();

        return photosets;
    },

    getPhotos: function () {
        var photos = this.pluck('photos');
        return _.flatten(photos);
    }
});
