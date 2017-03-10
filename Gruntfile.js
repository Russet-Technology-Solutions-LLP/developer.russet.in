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
            banner: '/*!\n' +
                ' * <%= pkg.name %>-v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyy") %>\n' +
                ' * <%= pkg.description %>' +
                ' * Auther: <%= pkg.author %>\n' +
                ' * Company: <%= pkg.company %>\n' +
                ' * Copyright: <%= pkg.copyright %>.\n' +
                ' * License(doc): <%= pkg.doc-licence %>\n' +
                ' * License(code): <%= pkg.code-license %>' +
                ' */\n'
        },
        
        // Tasks
        clean: {
            // clean task configuration goes here.
            dist: 'public/_assets'
        },
        less: {
            // less task configuration goes here. i.e compiling less files to css files.
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
    grunt.registerTask( 'default', [ 'copy' ] );
}
