'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var wlpConfig = {
        app: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        wlp: wlpConfig,

        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= wlp.app %>/*.html',
                    '{.tmp,<%= wlp.app %>}/styles/**/*.css',
                    '{.tmp,<%= wlp.app %>}/scripts/**/*.js',
                    '<%= wlp.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                    // '<%= wlp.app %>/scripts/templates/**/*.{ejs,mustache,hbs}',
                    // 'test/spec/**/*.js'
                ]
            },
            less: {
                files: [
                    '<%= wlp.app %>/less/**/*.less'
                ],
                tasks: ['less', 'autoprefixer']
            },
            jst: {
                files: [
                    '<%= wlp.app %>/scripts/templates/**/*.ejs'
                ],
                tasks: ['jst']
            }
        },

        connect: {
            options: {
                port: grunt.option('port') || SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, wlpConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, wlpConfig.dist)
                        ];
                    }
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },

        clean: {
            dist: ['.tmp', '<%= wlp.dist %>/*'],
            server: '.tmp'
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= wlp.app %>/scripts/**/*.js',
                '!<%= wlp.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%= wlp.app %>/scripts',
                    mainConfigFile: '<%= wlp.app %>/scripts/wlp.js',
                    name: 'wlp',
                    optimize: 'uglify2',
                    out: '<%= wlp.dist %>/scripts/wlp.js',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/wlp/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },

        useminPrepare: {
            html: '<%= wlp.app %>/index.html',
            options: {
                dest: '<%= wlp.dist %>'
            }
        },
        usemin: {
            html: ['<%= wlp.dist %>/{,*/}*.html'],
            css: ['<%= wlp.dist %>/styles/**/*.css'],
            options: {
                dirs: ['<%= wlp.dist %>']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= wlp.app %>/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= wlp.dist %>/images'
                }]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '.tmp/styles/wlp.min.css': ['.tmp/styles/wlp.css']
                    // src: ['.tmp/styles/**/*.css'],
                    // expand: true,
                    // ext: '.min.css'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/wlp/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= wlp.app %>',
                    src: '*.html',
                    dest: '<%= wlp.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.tmp',
                    dest: '<%= wlp.dist %>',
                    src: ['styles/**/*.css']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= wlp.app %>',
                    dest: '<%= wlp.dist %>',
                    src: [
                        '*.{ico,txt}',
                        'images/{,*/}*.{webp,gif}'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '<%= wlp.app %>',
                    dest: '<%= wlp.dist %>/fonts',
                    src: [
                        'fonts/{,*/}*.*',
                        'bower_components/fontawesome/fonts/{,*/}*.*',
                        'bower_components/bootstrap/dist/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    dest: '<%= wlp.dist %>/scripts/vendor',
                    cwd: '<%= wlp.app %>/bower_components',
                    src: [
                        'modernizr/modernizr.js',
                        'requirejs/require.js'
                    ]
                }]
            },
            serve: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    dest: '.tmp/scripts/vendor',
                    cwd: '<%= wlp.app %>/bower_components',
                    src: [
                        'modernizr/modernizr.js',
                        'requirejs/require.js'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '<%= wlp.app %>',
                    dest: '.tmp/fonts',
                    src: [
                        'fonts/{,*/}*.*',
                        'bower_components/fontawesome/fonts/{,*/}*.*',
                        'bower_components/bootstrap/dist/fonts/{,*/}*.*'
                    ]
                }]
            }
        },

        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= wlp.app %>/scripts/templates/**/*.ejs']
                }
            }
        },

        less: {
            options: {
                paths: ['<%= wlp.app %>/bower_components']
            },
            compile: {
                options: {
                    sourceMap: true
                },
                files: {
                    '.tmp/styles/wlp.css': '<%= wlp.app %>/less/wlp.less'
                }
            },
            min: {
                options: {
                    cleancss: true,
                    cleancssOptions: {
                        keepSpecialComments: 0
                    }
                },
                files: {
                    '.tmp/styles/wlp.min.css': '<%= wlp.app %>/less/wlp.less'
                }
            }
        },

        autoprefixer: {
            all: {
                src: '.tmp/styles/**/*.css'
            }
        }

    });


    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'less:compile',
            'autoprefixer',
            'cssmin',
            'copy:serve',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'less',
        'autoprefixer',
        // 'concat',
        // 'cssmin:dist',
        // 'uglify',
        'copy:dist',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};
