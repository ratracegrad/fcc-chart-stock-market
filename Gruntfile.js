module.exports = function(grunt) {

    // file to watch and scan
    var files = [
        'server.js',
        'app/app.js',
        'Gruntfile.js',
        'app/models/*.js',
        'app/routes/*.js',
        'app/lib/*.js',
        'test/*.js'
    ];

    var eslintFiles = files;

    grunt.initConfig({

        express: {
            options: {
                port: 3000
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
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
            options: {
                livereload: true
            },
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: files,
                tasks: ['mochacli:watch']
            },
            express: {
                files: ['**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // register tasks
    grunt.registerTask('default', ['lint', 'test', 'server']);
    grunt.registerTask('test', ['mochacli:test']);
    grunt.registerTask('lint', ['eslint:fix']);
    grunt.registerTask('server', ['express:dev', 'watch']);

};
