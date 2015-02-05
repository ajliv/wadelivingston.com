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
            this.$el.html(this.template());
            return this;
        },


        goTo: function (i) {
            var el = this.$('.pswp');
            var options = {
                index: i,
                bgOpacity: 0.95,
                closeOnScroll: false,
                showHideOpacity: true,
                showAnimationDuration: 500,
                hideAnimationDuration: 500,
                history: false
            };
            var gallery = window.gallery = new PhotoSwipe(el[0], PhotoSwipeUI, this.photos, options);
            gallery.init();
        }

    });

    return ViewerView;
});
