/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'underscore.string'
], function ($, _, Backbone, JST, s) {
    'use strict';

    var PortfolioView = Backbone.View.extend({
        template: JST['src/scripts/templates/portfolio.ejs'],

        el: '#portfolio',

        events: {},

        initialize: function () {
            return this;
        },

        render: function () {
            var data = { photosets: this.collection.toJSON() };
            _.forEach(data.photosets, function (photoset) {
                if (!photoset.slug) photoset.slug = s.slugify(photoset.title);
            });
            this.$el.html( this.template(data) );
            return this;
        }
    });

    return PortfolioView;
});
