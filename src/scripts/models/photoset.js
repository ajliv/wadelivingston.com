/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PhotosetModel = Backbone.Model.extend({
        idAttribute: '_id',

        url: '',

        defaults: {
            photos: [],
            title: ''
        },

        initialize: function() {
            return this;
        },


        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return PhotosetModel;
});
