'use strict';

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
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    onClick: function (e) {
        e.preventDefault();
        Vent.trigger('photoset:open', this.model.id);
    }

});
