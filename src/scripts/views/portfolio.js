/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var PortfolioView = Backbone.View.extend({
        template: JST['src/scripts/templates/portfolio.ejs'],

        el: '#portfolio',

        events: {},

        initialize: function () {
            return this;
        },

        render: function () {
            // console.log(_str.slugify('Testin testin test'));
            this.$el.html(this.template({ photosets: this.collection.toJSON() }));
            return this;
        }
    });

    return PortfolioView;
});
