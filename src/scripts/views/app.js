/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/portfolio',
    'views/viewer'
], function ($, _, Backbone, PortfolioView, ViewerView) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function () {
            console.log('hello');

            new ViewerView();
            new PortfolioView({ collection: this.collection }).render();

            return this;
        },

        render: function () {
            return this;
        }
    });

    return AppView;
});
