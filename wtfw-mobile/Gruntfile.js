/*global module */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      server: ['Gruntfile.js', 'app.js', 'routes/**/*.js'],
      client: ['public/js/page/**/*.js']
    },

    handlebars: {
      all: {
        src: 'handlebars/**/*.handlebars',
        dest: 'public/js/client-template.js'
      }
    },

    concat: {
      pagedeps: {
        src: ['public/js/deps/**/*.js'],
        dest: 'public/js/deps.js'
      },
      page: {
        src: ['public/js/client-template.js', 'public/js/page/**/*.js'],
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
        }
      },
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'public/css'
        }
      }
    },

    watch: {
      server: {
        files: ['Gruntfile.js', 'app.js', 'routes/**/*.js'],
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
        files: ['public/js/deps/**/*.js'],
        tasks: ['concat:pagedeps', 'uglify:pagedeps']
      },
      page: {
        files: ['public/js/client-template.js', 'public/js/page/**/*.js'],
        tasks: ['concat:pagedeps', 'uglify:pagedeps']
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