module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
      dist: {                            // Target
        options: {
          // Target options
          style: 'compressed'
        },
        files: {
          'dist/css/style-rtl.min.css': 'sass/base_rtl.scss',       // 'destination': 'source'
          'dist/css/style-ltr.min.css': 'sass/base_ltr.scss'
        }
      }
    },
    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: 0,
        sourceMap: false,
        advanced: false
      },
      target: {
        files: [{
          expand: true,
          cwd: 'css/*.css',
          src: ['css/*.css'],
          dest: 'dist/style.min.css',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      options: {
        mangle: false,
        beautify: false
      },
      my_target: {
        files: {
          'dist/app.min.js': [
            // 'bower_components/what-input/what-input.js',
            // 'js/jquery.js',
            // 'js/jquery.plugin.js',
            // 'js/viewreport.js',
            // 'js/backstretch.js',
            // 'js/app.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['uglify'],
        options: {
          interrupt: true,
        },
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass','uglify' , 'cssmin']);
};
