module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", { "stage": 0 }]]
        },
        files: {
          "build/bundle.js": "src/app.js"
        }
      }
    },
    watch: {
      scripts: {
        files: "src/*.js",
        tasks: ["browserify"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask('default', ['browserify']);
};
