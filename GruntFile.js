module.exports = function (grunt) {
    const mozjpeg = require('imagemin-mozjpeg');
    const pngquant = require('imagemin-pngquant');
    const gifsicle = require('imagemin-gifsicle');



    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Exemplo de tarefa: jshint (linting)
        uglify: {
            uglifyjs: {
                src: 'assets/js/*.js',
                dest: 'dist/js/gruntbuild.js'
            },
        },
        cssmin: {
            uglifycss: {
                src: 'assets/css/*.css',
                dest: 'dist/css/gruntbuild.css'
            }
        },
        css_purge: {
            purge: {
                options: {},
                src: 'dist/css/gruntbuild.css',
                dest: 'dist/css/gruntbuild.min.css',
            }
        },
        imagemin: {
            jpg: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    src: ['assets/imgs/*.jpg'],
                    dest: 'dist/'
                }]
            },
            png: {
                options: {
                    optimizationLevel: 7,
                    progressive: true,
                    use: [pngquant()]
                },
                files: [{
                    expand: true,
                    src: ['assets/imgs/*.png'],
                    dest: 'dist/'
                }]
            },
            gif: {
                options: {
                    optimizationLevel: 3,
                    use: [gifsicle()]
                },
                files: [{
                    expand: true,
                    src: ['assets/imgs/*.gif'],
                    dest: 'dist/'
                }]
            }
        },
        minifyHtml: {
            dev: {
                files: [{
                    expand: true,
                    src: ['index.html'],
                    dest: 'dist'
                }]
            }
        },
        penthouse: {
            extract: {
                outfile: '.tmp/critical.min.css',
                css: 'dist/css/gruntbuild.min.css',
                url: 'https://testefrontend.azurewebsites.net/',
                width: 1920,
                height: 900,
                skipErrors: false // this is the default
            },
        },
        clean: {
            deleteAllFiles: {
                src: ['dist/']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-css-purge');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-minify-html');
    grunt.loadNpmTasks('grunt-penthouse');

    //grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'css_purge', 'imagemin', 'minifyHtml', 'penthouse']);
    //grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'css_purge', 'imagemin', 'minifyHtml', 'penthouse']);
    grunt.registerTask('default', ['clean','minifyHtml']);

    //grunt.registerTask('default', ['clean','cssmin', 'css_purge', 'penthouse']);

}