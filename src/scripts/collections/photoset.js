'use strict';

var Backbone = require('backbone');
var PhotosetModel = require('../models/photoset');

module.exports = Backbone.Collection.extend({
    model: PhotosetModel,

    initialize: function () {
        this.on('add remove reset', this.generateOffsets, this);
        return this;
    },

    generateOffsets: function () {
        var offset = 0;
        this.forEach(function (photoset) {
            photoset.set('offset', offset);
            offset += photoset.get('photos').length;
        });
        return this;
    }
});
