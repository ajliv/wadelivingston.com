/*global Waypoint:false */
'use strict';

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
require('waypoints');

// var Vent = require('../vent');
var SlideshowView = require('./slideshow');
var PortfolioView = require('./portfolio');

module.exports = Backbone.View.extend({
    el: 'body',

    events: {
        'click #header .menu a': 'showSection'
    },

    initialize: function () {
        var scrollTimer = null;

        this.$sections = this.$('.section');
        this.$headerLinks = this.$('#header .menu a');

        $(window).on({
            'resize': function () {
                Waypoint.refreshAll();
            },
            'scroll': _.bind(function () {
                clearTimeout(scrollTimer);
                this.$el.addClass('disable-hover');

                scrollTimer = setTimeout(_.bind(function () {
                    this.$el.removeClass('disable-hover');
                }, this), 200);
            }, this)
        });

        this.$el.append(new SlideshowView({ collection: this.collection }).el);

        new PortfolioView({ 
            el: this.$('#portfolio'),
            collection: this.collection 
        });

        this.setupWaypoints();

        return this;
    },

    setupWaypoints: function () {
        var $header = this.$('#header');
        this.$sections.each(_.bind(function (i, section) {
            var $section = $(section);
            new Waypoint({
                element: section,
                offset: function () {
                    return -1 * ($section.outerHeight(true) - $header.outerHeight());
                },
                handler: _.bind(function (direction) {
                    if (direction === 'up') {
                        this.setActiveSection($section);
                    }
                }, this)
            });
            new Waypoint({
                element: section,
                offset: function () {
                    return $header.outerHeight(true);
                },
                handler: _.bind(function (direction) {
                    if (direction === 'down') {
                        this.setActiveSection($section);
                    }
                }, this)
            });
        }, this));
    },

    showSection: function (e) {
        var $target = $(e.currentTarget);
        var $section = $($target.attr('href'));

        e.preventDefault();

        if (!$section) return;

        $('html, body').stop().animate({ scrollTop: $section.offset().top }, {
            // easing: 'easeInOutQuad',
            complete: _.bind(function () {
                this.setActiveSection($section);
            }, this)
        });

    },

    setActiveSection: function ($section) {
        if (!$section || $section.hasClass('current')) return;

        this.$headerLinks.removeClass('active')
            .filter('[href=#' + $section.attr('id') + ']')
            .addClass('active');

        this.$sections.removeClass('current');
        $section.addClass('current');
    }
});
