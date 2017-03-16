/*!
* Russet-docs Gruntfile
* http://developer.russet.in
* Copyright 2016-2017 Russet Technology Solutions LLP.
* Author: Sandeep Sihari
* Licenced under MIT
*/

module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var path = require('path');
    
    var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

    // Project configuration
    grunt.initConfig({
        // Reading package configurations
        pkg: grunt.file.readJSON('package.json'),

        // Reading Jekyll configurations.
        jekyllConfig: grunt.file.readYAML('_config.yml'),

        // Project configurations
        project: {
            // projects assets destination.
            dest: {
                css: 'docs/assets/css',
                js: 'docs/assets/js',
                images: 'docs/assets/images',
                fonts: 'docs/assets/fonts',
                assets: 'docs/assets'
            }
        },

        // Meta data of the project.
        meta: {
            // Banner will be prepended before every javascript and css file.
            /*
            banner: '/*!\n' +
                ' * <%= pkg.name %>-v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyy") %>\n' +
                ' * <%= pkg.description %>' +
                ' * Auther: <%= pkg.author %>\n' +
                ' * Company: <%= pkg.company %>\n' +
                ' * Copyright: <%= pkg.copyright %>.\n' +
                ' * License: <%= pkg.licence %>\n' +
                ' * License(code): <%= pkg.code-license %>' +
                ' *///\n'
            banner: '/*!\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.author %>\n' +
                ' * <%= pkg.description %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                ' */\n',
        },

        jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
        jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),
        
        // Tasks
        clean: {
            // clean task configuration goes here.
            build: ["<%= project.dest.assets %>/*"],
        },

        less: {
            // less task configuration goes here. i.e compiling less files to css files.
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'bootstrap.css.map',
                    sourceMapFilename: '<%= project.dest.css %>/bootstrap.css.map'
                },
                src: 'node_modules/bootstrap/less/bootstrap.less',
                dest: '<%= project.dest.css %>/bootstrap.css'
            },
            /**** Compile time error. resolve it later.
            compileTheme: {
                options: { 
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>-theme.css.map',
                    sourceMapFilename: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfi    g.version %>-theme.css.map'
                },
                src: 'node_modules/bootstrap/less/theme.less',
                dest: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>-theme.css'
            },
            */
        },

        concat: {
            // concat task configuration goes here. i.e concatening javascript files.
            options: {
                banner: '<%= meta.banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
                stripBanners: false
            },
            bootstrap: {
                src: [
                    // bootstrap javascript source files.
                    'node_modules/bootstrap/js/transition.js',
                    'node_modules/bootstrap/js/alert.js',
                    'node_modules/bootstrap/js/button.js',
                    'node_modules/bootstrap/js/carousel.js',
                    'node_modules/bootstrap/js/collapse.js',
                    'node_modules/bootstrap/js/dropdown.js',
                    'node_modules/bootstrap/js/modal.js',
                    'node_modules/bootstrap/js/tooltip.js',
                    'node_modules/bootstrap/js/popover.js',
                    'node_modules/bootstrap/js/scrollspy.js',
                    'node_modules/bootstrap/js/tab.js',
                    'node_modules/bootstrap/js/affix.js'
                ],
                dest: '<%= project.dest.js %>/bootstrap.js'
            },
            webpack: {
                src: 'src/webpack/js/bundle.js',
                dest: '<%= project.dest.js %>/russetwebpack.js'
            },
            social: {
                src: [
                    'src/assets/js/facebook.js',
                    'src/assets/js/twitter.js',
                    'src/assets/js/linkedin.js',
                ],
                dest: '<%= project.dest.js %>/social.js'
            },
            release: {
                src: [
                    '<%= project.dest.js %>/bootstrap.js',
                    '<%= project.dest.js %>/russetwebpack.js',
                    '<%= project.dest.js %>/social.js'
                ],
                dest: '<%= project.dest.js %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.js'
            }
        },

        cssmin: {
            // cssmin task goes here. i.e minifising css files.
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                sourceMapInlineSources: true,
                advanced: false
            },
            minifyCore: {
                src: '<%= project.dest.css %>/bootstrap.css',
                dest: '<%= project.dest.css %>/bootstrap.min.css'
            },
            /*
            minifyTheme: {
                src: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>-theme.css',
                dest: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>-theme.min.css'
            },
            */
            release: {
                src: [
                    // css files for final release sources
                ],
                dest: '<%= project.dest.css %>/russetdocs.min.css'
            }
        },

        uglify: {
            // uglify task goes here. i.e minifising javascript files.
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: /^!|@preserve|@license|@cc_on/i
            },
            core: {
                src: '<%= project.dest.js %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.js',
                dest: '<%= project.dest.js %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.min.js'
            }
        },

        copy: {
            // copy task goes here. i.e copies files and folders.
            fonts: {
                files: [
                    // include files from font-awesome folder.
                    {expand: true, cwd: 'node_modules/font-awesome', src: ['fonts/*'], dest: '<%= project.dest.assets %>/'},

                    // include files from src
                    {expand: true, cwd: 'node_modules/bootstrap/fonts', src: ['**'], dest: '<%= project.dest.fonts %>/'},
                ],
            },
            images: {
                files: [
                    // copy images.
                    {expand: true, cwd: 'src/assets/images', src:['**/*'], dest: '<%= project.dest.images %>/'}
                ],
            },
        },
    });

    // Load the used plugins.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    // Register tasks.

    // Default tasks.
    grunt.registerTask( 'default', [ 'clean', 'less', 'concat', 'cssmin', 'uglify', 'copy' ] );
}
