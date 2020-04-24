module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      dist: "dist/**",
    },
    webpack: require("./build/webpack.config.js"),
  });
  grunt.registerTask("build", "使用webpack构建", ["clean", "webpack"]);
};
