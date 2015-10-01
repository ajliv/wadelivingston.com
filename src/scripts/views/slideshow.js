'use strict';

var _ = require('lodash');
var Backbone = require('backbone');
var PhotoSwipe = require('photoswipe');
var PhotoSwipeUI = require('photoswipe-ui');

var SlideshowTemplate = require('../templates/slideshow.ejs');
var Vent = require('../vent');

module.exports = Backbone.View.extend({
    template: SlideshowTemplate,

    className: 'slideshow',

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(Vent, 'photoset:open', this.onPhotosetOpen);
        return this;
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    getPhotos: function () {
        var photosets = this.collection.toJSON();
        return _(photosets)
            .pluck('photos')
            .flatten()
            .pluck('sizes')
            .map(function (photo) {
                return {
                    src: photo.large.src,
                    msrc: photo.small.src,
                    w: photo.large.width,
                    h: photo.large.height
                };
            }).value();
    },

    openPhotoSwipe: function (i, el) {
        if (i < 0) return;

        var psOptions = {
            index: i,
            bgOpacity: 0.95,
            closeOnScroll: false,
            showHideOpacity: true,
            showAnimationDuration: 500,
            hideAnimationDuration: 500,
            history: false,
            getThumbBoundsFn: function () {
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                var rect = el ? el.getBoundingClientRect() : false;
                if (!rect) return { x: 0, y: 0, w: 0 };

                console.log(rect, {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                });

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: 0 //rect.width
                };
            }
        };
        var gallery = new PhotoSwipe(this.$('.pswp')[0], PhotoSwipeUI, this.getPhotos(), psOptions);

        gallery.init();
    },

    onPhotosetOpen: function (id, el) {
        var photoset = this.collection.get(id);
        if (!photoset) return;

        var index = photoset.get('offset') || 0;

        this.openPhotoSwipe(index, el);
    }
});
