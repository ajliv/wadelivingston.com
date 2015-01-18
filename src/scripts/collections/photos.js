/*global define*/

define([
    'underscore',
    'backbone',
    'models/photos'
], function (_, Backbone, PhotosModel) {
    'use strict';

    var PhotosCollection = Backbone.Collection.extend({
        model: PhotosModel
    });

    return PhotosCollection;
});
