/*global Waypoint:false */
'use strict';

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
require('waypoints');

var PortfolioView = require('./portfolio');

module.exports = Backbone.View.extend({
    el: 'body',

    events: {
        'click #header': function toggleHeaderHover (e) {
            var $header = $(e.currentTarget);

            e.stopPropagation();

            if (e.target.tagName.toLowerCase() === 'a' && $header.hasClass('hover')) {
                return;
            }

            $header.toggleClass('hover');
        },
        'click #header h1': 'onHeaderClick',
        'click #header a': 'onHeaderLinkClick'
    },

    initialize: function () {
        var $window = $(window);

        this.scrollY = $window.scrollTop();
        this.scrollTimer = null;
        this.$header = this.$('#header');
        this.$sections = this.$('#sections');

        this.$el.addClass('at-top');

        new PortfolioView({
            el: this.$('#portfolio'),
            collection: this.collection
        });

        this.setupWaypoints();

        _.bindAll(this, 'onResize', 'onScroll');
        $window.on({
            'resize': this.onResize,
            'scroll': this.onScroll
        });

        this.listenToOnce(this.collection, 'reset', function () {
            setTimeout(function () {
                Waypoint.refreshAll();
            }, 400);
        });

        return this;
    },

    setupWaypoints: function () {
        var $header = this.$('#header');

        this.$sections.find('.section').each(_.bind(function (i, section) {
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

    setActiveSection: function ($section) {
        if (!$section || $section.hasClass('current')) return;

        this.$('#header .menu a').removeClass('active')
            .filter('[href="#' + ($section.attr('id')) + '"]')
            .addClass('active');

        this.$('.section').removeClass('current');
        $section.addClass('current');
    },

    onHeaderClick: function (e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 });
    },

    onHeaderLinkClick: function (e) {
        var $target = $(e.currentTarget);
        var $section;

        if (Modernizr.touch && !(this.$header.hasClass('hover') || this.$el.hasClass('at-top'))) {
            e.preventDefault();
            return;
        }

        if ($target.hasClass('menu-section')) {
            $section = $($target.attr('href'));
            if (!$section) return;

            e.preventDefault();

            $('html, body').stop().animate({ scrollTop: $section.offset().top }, {
                complete: _.bind(function () {
                    this.setActiveSection($section);
                }, this)
            });
        }
    },

    onResize: function () {
        Waypoint.refreshAll();
    },

    onScroll: function (e) {
        clearTimeout(this.scrollTimer);

        var scrollY = e.currentTarget.scrollY;
        // var direction = (scrollY > this.scrollY) ? 'down' : 'up';

        this.scrollY = scrollY;

        this.$sections.addClass('disable-hover');
        this.$el.toggleClass('at-top', scrollY < 20);
            // .toggleClass('scrolling-up', direction === 'up')
            // .toggleClass('scrolling-down', direction === 'down');

        this.scrollTimer = setTimeout(_.bind(function () {
            this.$header.removeClass('hover');
            this.$sections.removeClass('disable-hover');
            this.$el.toggleClass('at-top', scrollY < 20);
                // .removeClass('scrolling-up scrolling-down');
        }, this), 300);
    }

});
