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
          keepalive: true,
          middleware: function (connect, options) {
            return [
              //require('connect-livereload')(),
              compression({
                level: 9
              }),
              serveStatic(options.mybase),
              function (req, res, next) {
                console.log("req, res", req, res);
                if (req.headers.origin === undefined) {
                  res.setHeader('Access-Control-Allow-Origin', "*");
                } else {
                  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
                }
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                console.log(req.method + " on " + req.originalUrl);
                if (!(/\/(src|dist|data)\//).test(req.originalUrl)) {
                  console.log("src|dist|data.test(req.originalUrl)", (/\/(src|dist|data)\//).test(req.originalUrl));
                  console.log("req.originalUrl", req.originalUrl);
                  var body = grunt.file.read("index.html");
                  res.write(body);
                  res.end();
                } else {
                  res.setHeader('Access-Control-Allow-Headers', 'content-type');
                  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                  res.setHeader('Content-Length', '0');
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  datahandler(req, res, STUBS_URL, function(){
                    console.log("first end");
                    res.end();
                    //next();
                  });
                }
              },
              function (req, res, next) {
                if (!(/\/(src|dist|data)\//).test(req.originalUrl)) {
                  var body = grunt.file.read("index.html");
                  res.write(body);
                  console.log("2nd end");
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