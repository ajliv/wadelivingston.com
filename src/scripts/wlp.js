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
        'bootstrap': [ 'jquery' ]
    },
    paths: {
        'jquery'           : '../bower_components/jquery/dist/jquery',
        'backbone'         : '../bower_components/backbone/backbone',
        'lodash'           : '../bower_components/lodash/dist/lodash',
        'underscore.string': '../bower_components/underscore.string/dist/underscore.string',
        'bootstrap'        : '../bower_components/bootstrap/dist/js/bootstrap',
        'photoswipe'       : '../bower_components/photoswipe/dist/photoswipe',
        'photoswipeui'     : '../bower_components/photoswipe/dist/photoswipe-ui-default'
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
    'bootstrap'
], function ($, _, Backbone, AppView, PhotosetCollection) {
    var WLP = window.WLP = {};

    WLP.Photosets = new PhotosetCollection();
    WLP.Photosets.once('reset', function (collection) {
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
