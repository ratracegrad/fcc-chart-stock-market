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

    var apidocFiles = [
        'app/routes'
    ];

    grunt.initConfig({

        jscs: {
            fix: {
                src: eslintFiles,
                options: {
                    config: 'config.jscs.json',
                    fix: true
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
        apidoc: {
            dispatch: {
                src: apidocFiles,
                dest: 'public/api-docs/'
            }
        },
        jsdoc: {
            dist: {
                src: ['app/lib/*.js', 'app/routes/*.js', 'README.md'],
                options: {
                    destination: 'public/docs',
                    template: 'node_modules/minami'
                }
            }
        },
        //shell: {
        //    doswagger: {
        //        command: 'node node_modules/apidoc-swagger/bin/apidocSwagger.js -i ./routes -o ./public/swagger',
        //        options: {
        //            //stderr: true,
        //            execOptions: {
        //                cwd: '.'
        //            }
        //        }
        //    }
        //},
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
    grunt.registerTask('default', ['lint', 'test', 'docs']);
    grunt.registerTask('test', ['mochacli:test']);
    grunt.registerTask('docs', ['apidoc', 'jsdoc']);

    grunt.registerTask('lint', ['eslint:fix']);

    // JSCS is still here, because running it fixes some things that eslint doesn't, that aren't worth fixin' by hand.
    // if they ever fix things in different directions, though, eslint wins and you should change config.jscs.json
    grunt.registerTask('dev-local-cleanup', ['jscs:fix']);

};
