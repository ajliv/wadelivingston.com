'use strict';

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI = require('photoswipe-ui');

var MetaView = require('./meta');
var SlideshowTemplate = require('../templates/slideshow.ejs');
var Vent = require('../vent');

module.exports = Backbone.View.extend({
    template: SlideshowTemplate,

    className: 'slideshow',

    initialize: function () {
        this.currentIndex = 0;
        this.photos = [];

        this.listenToOnce(this.collection, 'reset', function () {
            this.photos = this.collection.getPhotos();
            this.render();
            this.listenTo(Vent, 'photoset:open', this.onPhotosetOpen);
        });

        return this;
    },

    render: function () {
        this.$el
            .html(this.template())
            .find('.pswp__meta')
            .append(new MetaView({ collection: this.collection }).render().el);

        return this;
    },

    openSlideshow: function () {
        var $window = $(window);
        var _getThumbBoundsFn = function () {
            return {
                x: $window.width() * 0.5,
                y: $window.height() * 0.5 + $window.scrollTop(),
                w: 0
            };
        };

        var psOptions = {
            index: this.currentIndex,
            bgOpacity: 0.95,
            closeOnScroll: false,
            showHideOpacity: true,
            showAnimationDuration: 300,
            hideAnimationDuration: 300,
            history: false,
            counterEl: false,
            getThumbBoundsFn: function () {
                return _getThumbBoundsFn();
            }
        };

        var gallery = new PhotoSwipe(this.$('.pswp')[0], PhotoSwipeUI, this.photos, psOptions);
        gallery.listen('beforeChange', _.bind(this.onBeforeChange, this));
        gallery.init();
    },

    onBeforeChange: function (inc) {
        var index = this.currentIndex + inc;
        var photo;

        if (index < 0) index = this.photos.length + index;
        if (index >= this.photos.length) index = this.photos.length - index;

        photo = this.photos[index];
        if (!photo) return;

        this.currentIndex = index;

        Vent.trigger('slideshow:change', index, photo);
    },

    onPhotosetOpen: function (id) {
        var photoset = this.collection.get(id);
        if (!photoset) return;

        var index = photoset.get('offset') || 0;
        this.currentIndex = index;

        this.openSlideshow();
    }
});
