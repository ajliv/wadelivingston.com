'use strict';

var Backbone = require('backbone');
var Vent = require('../vent');

var MetaTemplate = require('../templates/meta.ejs');
var MetaCreditsTemplate = require('../templates/meta-credits.ejs');

module.exports = Backbone.View.extend({

    className: 'meta',

    template: MetaTemplate,

    initialize: function () {
        this.listenTo(Vent, 'slideshow:change', this.onSlideshowChange, this);
        return this;
    },

    render: function () {
        this.$el.html(this.template({
            photos: this.collection.getPhotos()
        }));

        return this;
    },

    onSlideshowChange: function (index, photo) {
        var $metaBottom = this.$('.meta-bottom');
        var creditsHTML = MetaCreditsTemplate(photo);

        this.$('.count-index').html(index + 1);
        this.$('.title').html(photo._parentTitle);

        $metaBottom.stop().fadeOut('300', function () {
            $metaBottom.find('.credits').html(creditsHTML);
            $metaBottom.fadeIn('300');
        });
    }
});
