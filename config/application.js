/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(lineman) {

  // Override application configuration here. Common examples follow in the comments.
  return {
    files: {
      less: {
        app: "app/css/**/*.less"
      }
    },

    ngtemplates: {
      app: {
        options: {
          module: "tsn.templates",
          standalone: true,
          prefix: '/'
        },
        src: ["app/templates/**/*.html", "app/js/**/*.template.html"],
        dest: "<%= files.ngtemplates.dest %>"
      }
    },

    watch: {
      options: {
        livereload: true,
        module: "grunt-contrib-watch"
      },
      less: {
        files: ["<%= files.less.app %>"],
        tasks: ["less", "concat_sourcemap:css"]
      },
      ngtemplates: {
        files: ["app/js/**/*.template.html"],
        tasks: ["ngtemplates", "concat_sourcemap:js"]
      }
    },

    bower: {
      install: {
        options: {
          targetDir: path.join(process.cwd(), "/vendor"),
          cleanTargetDir: true,
          copy: true,
          bowerOptions: {
            production: false
          },
          layout: function(type, component, source) {

            function bowerDirectory() {
              var bowerConfig,
                bowerrc = path.join(process.cwd(), ".bowerrc");

              if (fs.existsSync(bowerrc)) {
                bowerConfig = JSON.parse(fs.readFileSync(bowerrc, "utf8"));
              }

              return bowerConfig !== null ? bowerConfig.directory : "bower_components";
            }

            // Makes Bower retains the file structure when copied to the targetDirectory.
            var replace = path.join(bowerDirectory(), component);
            return path.join(type, component.replace('.', '-'), path.dirname(source).replace(replace, ''));
          }
        }
      }
    },

    server: {
      pushState: true
    },

    uglify: {
      options: {
        mangle: false
      }
    },


    jshint: {
      files: [
        "<%= files.js.app %>", 
        "!app/js/**/*.min.js"
      ],
      options: {
        latedef: 'nofunc'
      }
    },

    'spec-ci': {
      options: {
        reporter: {
          type: 'tap',
          dest: 'spec-ci.tap'
        }
      }
    }
  };
};
