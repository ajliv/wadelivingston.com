/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/portfolio',
    'views/viewer',
    'fastclick',
    'waypoints',
    'waypoints.inview'
], function ($, _, Backbone, PortfolioView, ViewerView, FastClick) {
    'use strict';

    var AppView = Backbone.View.extend({

        el: 'body',


        events: {
            'click #header .menu a': 'goToSection'
        },


        initialize: function () {
            var self = this;
            var header = this.$('#header');
            var sections = this.$('.wlp-section');
            var $body = this.$el;
            var timer;

            FastClick.attach(this.el);


            new PortfolioView({ collection: this.collection }).render();

            window.setInterval(function () {
                Waypoint.refreshAll();
            }, 5000);

            sections.css('min-height', Waypoint.viewportHeight());
            $(window).on('resize', function () {
                sections.css('min-height', Waypoint.viewportHeight());
                Waypoint.refreshAll();
            }).on('scroll', function () {
                clearTimeout(timer);
                $body.addClass('disable-hover');

                timer = setTimeout(function (){
                    $body.removeClass('disable-hover');
                }, 200);
            });

            sections.each(function (i, el) {
                var section = $(el);
                new Waypoint({
                    element: el,
                    offset: function () {
                        return (section.outerHeight(true) - header.outerHeight()) * -1;
                    },
                    handler: function (direction) {
                        if (direction === 'up') {
                            self.attachHeaderTo(section);
                        }
                    }
                });
                new Waypoint({
                    element: el,
                    offset: function () {
                        return header.outerHeight(true);
                    },
                    handler: function (direction) {
                        if (direction === 'down') {
                            self.attachHeaderTo(section);
                        }
                    }
                });
            });

            return this;
        },


        goToSection: function (e) {
            var self = this;
            var header = this.$('#header');
            var section = $(e.currentTarget.hash);
            var offset = section.offset().top;

            e.preventDefault();

            self.attachHeaderTo(section);
            $('html, body').stop().animate({ scrollTop: offset }, 400, 'easeInOutQuad');
        },


        attachHeaderTo: function (section) {
            if (!section.hasClass('current')) {
                var header = this.$('#header');
                var menu = header.find('.menu');
                var offset = section.offset().top;

                menu.find('a')
                    .removeClass('active')
                    .filter('[data-section="' + section.attr('id') + '"]')
                    .addClass('active');

                this.$('.wlp-section').removeClass('current');
                section.addClass('current');

                return true;
            }

            return false;
        }

    });

    return AppView;
});
