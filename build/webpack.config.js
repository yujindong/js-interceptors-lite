const webpack = require("webpack");
const path = require("path");

function resolvePath(dir) {
  return path.join(__dirname, "..", dir);
}
const config = {};
function createWebpackConfig(name) {
  const cfg = {
    entry: "./src/index.js",
    output: {
      path: resolvePath("dist"),
      filename: `${name}.js`,
      sourceMapFilename: name + ".map",
      library: "interceptor",
      libraryTarget: "umd",
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      ],
    },
    mode: "production",
    devtool: "source-map",
    optimization: {
      minimize: name.indexOf("min") !== -1,
    },
  };
  cfg.plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ];
  return cfg;
}
["interceptor", "interceptor.min"].forEach((name) => {
  config[name] = createWebpackConfig(name);
});

module.exports = config;
