module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['build/'],

        copy: {
            html: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html'],
                dest: 'build/'
            },
            images: {
                expand: true,
                cwd: 'app/images/',
                src: ['**/*.{gif,jpg,png,svg,jpeg}'],
                dest: 'build/images/'
            }
        },

        sass: {
            stylesheets: {
                options: {
                    noCache: true,
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assets/stylesheets/',
                    src: ['**/*.scss'],
                    dest: 'build/assets/stylesheets/',
                    ext: '.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 1111,
                    base: 'build/',
                    livereload: false
                }
            }
        },

        watch: {
            options: {
                atBegin: true,
                livereload: false,
                spawn: false
            },
            html: {
                files: 'app/*.html',
                tasks: ['copy:html']
            },
            images: {
                files: 'app/images/**/*.{gif,jpg,png,svg}',
                tasks: ['copy:images']
            },
            sass: {
                files: 'app/assets/stylesheets/**/*.scss',
                tasks: ['sass:stylesheets']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('dev', ['clean', 'connect', 'watch']);
    grunt.registerTask('build', ['clean', 'copy', 'sass']);
};
