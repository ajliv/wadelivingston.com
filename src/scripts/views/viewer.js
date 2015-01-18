/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'photoswipe',
    'photoswipeui'
], function ($, _, Backbone, JST, PhotoSwipe, PhotoSwipeUI) {
    'use strict';

    var ViewerView = Backbone.View.extend({
        template: JST['src/scripts/templates/viewer.ejs'],

        el: '#viewer',

        events: {},

        initialize: function () {
            var photosets = _.pluck(WLP.Photosets.getAllPhotos(), 'sizes');
            var photos = this.photos = [];

            _.forEach(photosets, function (p) {
                photos.push({
                    src: p.large.src,
                    msrc: p.small.src,
                    w: p.large.width,
                    h: p.large.height
                });
            });

            return this;
        },

        render: function () {
            var options = {
                bgOpacity: 0.95,
                closeOnScroll: false
            };
            this.$el.html(this.template());
            this.gallery = new PhotoSwipe(this.$('.pswp')[0], PhotoSwipeUI, this.photos, options);
            this.gallery.init();
            return this;
        },

        gotoSlide: function () {
            var options = {};

            if (this.gallery) {
                this.gallery.init();
            }

            return this;
        }
    });

    return ViewerView;
});
