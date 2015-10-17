'use strict';

var Backbone = require('backbone');
var PhotosetView = require('./photoset');
var SlideshowView = require('./slideshow');

module.exports = Backbone.View.extend({

    initialize: function () {
        this.$el.append(new SlideshowView({ collection: this.collection }).el);
        this.listenToOnce(this.collection, 'reset', this.render);
        return this;
    },

    render: function () {
        var $photosets = this.$('.photosets');
        this.collection.forEach(function (photoset) {
            var photosetView = new PhotosetView({ model: photoset });
            $photosets.append(photosetView.render().el);
        }, this);

        return this;
    }
});
