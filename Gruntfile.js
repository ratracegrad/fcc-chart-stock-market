module.exports = function(grunt) {

    // file to watch and scan
    var files = [
        'app/app.js',
        'server.js',
        'Gruntfile.js',
        'app/lib/*.js',
        'app/routes/*.js',
        'test/*.js'
    ];

    var eslintFiles = files;

    grunt.initConfig({

        eslint: {

            scan: {
                src: eslintFiles,
                options: {
                    configFile: '.eslintrc'
                }
            },

            fix: {
                src: eslintFiles,
                options: {
                    configFile: '.eslintrc',
                    fix: true
                }
            }

        },
        mochacli: {
            test: {
                options: {
                    reporter: 'spec',
                    recursive: true,
                    force: true,
                    bail: false
                }
            },
            watch: {
                options: {
                    reporter: 'nyan',
                    recursive: true,
                    force: true,
                    bail: false
                }
            },
            tap: {
                options: {
                    reporter: 'tap',
                    recursive: true,
                    force: true,
                    bail: false
                }
            }
        },
        watch: {
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: files,
                tasks: ['mochacli:watch']
            }
        }
    });

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // register tasks
    grunt.registerTask('default', ['lint', 'test']);
    grunt.registerTask('test', ['mochacli:test']);
    grunt.registerTask('lint', ['eslint:fix']);

};
