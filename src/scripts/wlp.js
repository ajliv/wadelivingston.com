/*global require*/
'use strict';

require.config({
    shim: {
        'backbone': {
            deps: [ 'lodash', 'jquery' ],
            exports: 'Backbone'
        },
        'lodash': {
            exports: '_'
        },
        'bootstrap': [ 'jquery' ],
        'waypoints': [ 'jquery' ],
        'waypoints.inview': [ 'waypoints' ]
    },
    paths: {
        'backbone'         : '../bower_components/backbone/backbone',
        'bootstrap'        : '../bower_components/bootstrap/dist/js/bootstrap',
        'fastclick'        : '../bower_components/fastclick/lib/fastclick',
        'jquery'           : '../bower_components/jquery/dist/jquery',
        'jquery-ui.effect' : '../bower_components/jquery-ui/ui/effect',
        'lodash'           : '../bower_components/lodash/dist/lodash',
        'photoswipe'       : '../bower_components/photoswipe/dist/photoswipe',
        'photoswipeui'     : '../bower_components/photoswipe/dist/photoswipe-ui-default',
        'underscore.string': '../bower_components/underscore.string/dist/underscore.string',
        'waypoints'        : '../bower_components/waypoints/lib/jquery.waypoints',
        'waypoints.inview' : '../bower_components/waypoints/lib/shortcuts/inview'

    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});

require([
    'jquery',
    'lodash',
    'backbone',
    'views/app',
    'collections/photoset',
    'bootstrap',
    'jquery-ui.effect'
], function ($, _, Backbone, AppView, PhotosetCollection) {
    var WLP = window.WLP = {};

    WLP.Photosets = new PhotosetCollection();
    WLP.Photosets.once('reset', function (collection) {
        window.scrollTo(0,0);
        new AppView({ collection: collection }).render();
        Backbone.history.start();
    });

    $.ajax({
        'url': 'http://i.wadelivingston.com/data/photosets.json',
        'success': function (data) {
            WLP.Photosets.reset(data);
        }
    });

});
