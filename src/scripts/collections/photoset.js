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
            this.on('reset', this.setOffsets, this);
        },


        setOffsets: function () {
            var offset = 0;

            this.forEach(function (ps) {
                ps.set('offset', offset);
                offset += ps.get('photos').length;
            });

            console.log(this.toJSON());
            return this;
        },


        getAllPhotos: function () {
            var json = this.toJSON();
            var obj = _.flatten(_.pluck(json, 'photos'));
            return JSON.parse(JSON.stringify(obj));
        }

    });

    return PhotosetCollection;
});
