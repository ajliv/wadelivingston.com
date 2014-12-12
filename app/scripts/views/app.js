/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
], function ($, _, Backbone) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',

        events: {},

        initialize: function () {
            console.log('hello');
            console.log('hello');
            return this;
        },

        render: function () {
            return this;
        }
    });

    return AppView;
});
