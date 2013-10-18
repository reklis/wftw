/*global module */

module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        'curly'   : true,
        'eqeqeq'  : true,
        'forin'   : true,
        'immed'   : true,
        'indent'  : 2,
        'latedef' : true,
        'newcap'  : true,
        'noarg'   : true,
        'noempty' : true,
        'nonew'   : true,
        'plusplus': false,
        'quotmark': 'single',
        'undef'   : true,
        'unused'  : true,
        'strict'  : true,
        'trailing': true,
        'maxdepth': 5,
        'maxlen'  : 100,
        'laxbreak': true,
        'onevar'  : true
      },
      server: {
        options: {
          node: true,
        },
        files: {
          src: ['Gruntfile.js', 'app.js', 'lib/**/*.js', 'routes/**/*.js']
        }
      },
      client: {
        options: {
          browser: true
        },
        files: {
          src: ['public/js/page/**/*.js']
        }
      }
      
    },

    handlebars: {
      all: {
        src: 'handlebars/**/*.handlebars',
        dest: 'public/js/client-template.js'
      }
    },

    concat: {
      pagedeps: {
        src: ['public/js/deps/**/*.js', 'public/js/client-template.js'],
        dest: 'public/js/deps.js'
      },
      page: {
        src: ['public/js/page/**/*.js'],
        dest: 'public/js/page.js'
      }
    },

    uglify: {
      pagedeps: {
        src: 'public/js/deps.js',
        dest: 'public/js/deps.min.js'
      },
      page: {
        src: 'public/js/page.js',
        dest: 'public/js/page.min.js'
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'public/css-min',
          outputStyle: 'compressed'
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'public/css',
          outputStyle: 'nested'
        }
      }
    },

    watch: {
      server: {
        files: ['Gruntfile.js', 'app.js', 'lib/**/*.js', 'routes/**/*.js'],
        tasks: ['jshint']
      },
      handlebars: {
        files: ['handlebars/**/*.handlebars'],
        tasks: ['handlebars']
      },
      styles: {
        files: ['sass/**/*.scss'],
        tasks: ['compass']
      },
      pagedeps: {
        files: ['public/js/deps/**/*.js', 'public/js/client-template.js'],
        tasks: ['concat:pagedeps', 'uglify:pagedeps']
      },
      page: {
        files: ['public/js/page/**/*.js'],
        tasks: ['concat:page', 'uglify:page']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'handlebars', 'concat', 'uglify', 'compass']);

};