module.exports = function(grunt) {

  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var compression = require('compression');

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", { loose: "all" }]]
        },
        files: {
          "build/bundle.js": "src/app.js"
        }
      }
    },
    webfont: {
      icons: {
        src: 'src/img/svg-icons/*.svg',
        dest: 'src/fonts/',
        destCss: 'src/scss',
        options: {
          font: 'fontcustom',
          stylesheet: 'scss',
          relativeFontPath: "../fonts/",
          hashes: true
        }
      }
    },
    sprite: {
      all: {
        src: 'src/img/icons/*.png',
        dest: 'src/img/allIcons.png',
        destCss: 'src/scss/_sprites.scss',
        padding: 10,
        cssTemplate: 'src/img/icons/template.handlebars'
      }
    },
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'nested',
        sourceComments: false
      },
      dist: {
        files: {
          'src/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    atomizer: {
      // basic
      atomize: {
        options: {
          configFile: 'src/atomConfig.js'
        },
        files: [{
          src: ['index.html','src/**/*.html'],
          dest: 'src/scss/_atom.scss'
        }]
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["browserify"]
      },
      sprite: {
        files: ['src/img/icons/*.png'],
        tasks: ['sprite']
      },
      sass: {
        files: ['src/scss/**/*.scss', 'src/modules/**/*.scss'],
        tasks: ['sass'],
        options: {
//          livereload: false
        }
      },
      atomize: {
        options: {
//          livereload: true
        },
        files: [
          'index.html',
          'src/**/*.html',
          'src/**/*.js',
          'src/**/*.css',
          '!src/scss/_atom.scss',
          '!src/scss/main.scss',
          '!src/css/main.css'
        ],
        tasks: ['atomizer']
      }
    },
    // https://github.com/senchalabs/connect#readme
    connect: {
      server : {
        options: {
          port: 8090,
          hostname: "*",
          base: './',
          mybase: "./",
          keepalive: false,
          middleware: function (connect, options) {
            return [
              //require('connect-livereload')(),
              compression({
                level: 9
              }),
              serveStatic(options.mybase),
              function (req, res, next) {
                if (req.headers.origin === undefined) {
                  res.setHeader('Access-Control-Allow-Origin', "*");
                } else {
                  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
                }
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                if (!(/\/(src|dist|data)\//).test(req.originalUrl)) {
                  var body = grunt.file.read("index.html");
                  res.write(body);
                  res.end();
                } else {
                  res.setHeader('Access-Control-Allow-Headers', 'content-type');
                  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                  res.setHeader('Content-Length', '0');
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  datahandler(req, res, STUBS_URL, function(){
                    res.end();
                    //next();
                  });
                }
              },
              function (req, res, next) {
                if (!(/\/(src|dist|data)\//).test(req.originalUrl)) {
                  var body = grunt.file.read("index.html");
                  res.write(body);
                  res.end();
                } else {
                  next();
                }
              },
              serveIndex(options.mybase)
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['browserify']);
  grunt.registerTask('sv', ['connect:server', 'watch']);
};