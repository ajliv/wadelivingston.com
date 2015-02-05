/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/viewer',
    'underscore.string'
], function ($, _, Backbone, JST, ViewerView, s) {
    'use strict';

    var PortfolioView = Backbone.View.extend({
        template: JST['src/scripts/templates/portfolio.ejs'],

        el: '#portfolio',

        events: {
            'click a[data-photoset]': 'openPhotoset'
        },

        initialize: function () {
            this.viewer = new ViewerView().render();
            return this;
        },

        render: function () {
            var data = { photosets: this.collection.toJSON() };
            _.forEach(data.photosets, function (photoset) {
                if (!photoset.slug) photoset.slug = s.slugify(photoset.title);
            });
            this.$el.html( this.template(data) );
            return this;
        },

        openPhotoset: function (e) {
            var id = $(e.currentTarget).data('photoset');
            var photoset = WLP.Photosets.get(id);

            e.preventDefault();

            this.viewer.goTo(photoset.get('offset'));
        }
    });

    return PortfolioView;
});
