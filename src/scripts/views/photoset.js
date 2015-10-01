'use strict';

var _ = require('lodash');
var Backbone = require('backbone');
var Vent = require('../vent');
var PhotosetTemplate = require('../templates/photoset.ejs');

module.exports = Backbone.View.extend({

    template: PhotosetTemplate,

    className: 'photoset',

    events: {
        'click': 'onClick'
    },

    initialize: function () {
        return this;
    },

    render: function () {
        var cover = this.model.get('cover');
        var img = new Image();

        this.$el.html(this.template(this.model.toJSON()));

        img.onload = _.bind(function () {
            this.$el.css('opacity', 1);
        }, this);
        img.src = cover.large.src;

        return this;
    },

    onClick: function (e) {
        e.preventDefault();
        Vent.trigger('photoset:open', this.model.id, this.el);
    }

});
