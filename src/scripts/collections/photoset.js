/*global define*/

define([
    'underscore',
    'backbone',
    'models/photoset'
], function (_, Backbone, PhotosetModel) {
    'use strict';

    var PhotosetCollection = Backbone.Collection.extend({
        model: PhotosetModel,


        initialize: function () {
            this.on('add remove reset', this.setOffsets, this);
            return this;
        },


        setOffsets: function () {
            var offset = 0;

            this.forEach(function (ps) {
                ps.set('offset', offset);
                offset += ps.get('photos').length;
            });

            return this;
        },


        getAllPhotos: function () {
            var json = this.toJSON();
            return _.flatten(_.pluck(json, 'photos'));
        }

    });

    return PhotosetCollection;
});
