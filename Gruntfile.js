module.exports = function(grunt) {
    
    // Project configuration
    grunt.initConfig({
        // Reading package configurations
        pkg: grunt.file.readJSON('package.json'),

        // Reading Jekyll configurations.
        jekyllConfig: grunt.file.readYAML('_config.yml'),

        // Project configurations
        project: {
            // projects assets source.
            src: {
                css: 'src/_assets/css',
                js: 'src/_assets/js',
                images: 'src/_assets/images',
                fonts: 'src/_assets/fonts'
            },
            // projects assets destination.
            dest: {
                css: 'public/_assets/css',
                js: 'public/_assets/js',
                images: 'public/_assets/images',
                fonts: 'public/_assets/fonts',
                assets: 'public/_assets'
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
                ' */\n'
        },
        
        // Tasks
        clean: {
            // clean task configuration goes here.
            build: ["<%= project.dest.assets %>/*"],
        },
        less: {
            // less task configuration goes here. i.e compiling less files to css files.
            build: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.css.map',
                    sourceMapFilename: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.css.map'
                },
                src: '<%= project.src.css %>/site.less',
                dest: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.css'
            },
            release: {
                src: ['<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.css'],
                dest: '<%= project.dest.css %>/<%= jekyllConfig.github_username %>-<%= jekyllConfig.version %>.css',
                options: {
                    banner: '<%= meta.banner %>',
                    cleancss: true,
                    compress: true
                }
            }
        },
        concat: {
            // concat task configuration goes here. i.e concatening javascript files.
        },
        cssmin: {
            // cssmin task goes here. i.e minifising css files.
        },
        uglify: {
            // uglify task goes here. i.e minifising javascript files.
            options: {
                mangle: false
            },
        },
        copy: {
            // copy task goes here. i.e copies files and folders.
            fonts: {
                files: [
                    // include files from font-awesome folder.
                    {expand: true, cwd: 'node_modules/font-awesome', src: ['fonts/*'], dest: '<%= project.dest.assets %>/'},

                    // include files from src
                    {expand: true, cwd: '<%= project.src.fonts %>', src: ['**'], dest: '<%= project.dest.fonts %>/'},
                ],
            },
            images: {
                files: [
                    // copy images.
                    {expand: true, cwd: '<%= project.src.images %>', src:['**/*'], dest: '<%= project.dest.images %>/'}
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
    grunt.registerTask( 'default', [ 'clean', 'copy', 'less:build', 'less:release' ] );
}
