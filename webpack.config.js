const path = require("path");
console.log(path.resolve(__dirname, "temp"));
console.log(__dirname);

const postCSSPlugins = [
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer")
];

const chokidar = require("chokidar");

module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "appjs-bundled.js",
    path: path.resolve(__dirname, "js")
  },

  devServer: {
    // ... other server config
    /**
     * Watch for changes to PHP files and reload the page when one changes.
     */
    before: function(app, server) {
      const files = ["./**/*.php"];

      chokidar
        .watch(files, {
          alwaysStat: true,
          atomic: false,
          followSymlinks: false,
          ignoreInitial: true,
          ignorePermissionErrors: true,
          persistent: true,
          usePolling: true
        })
        .on("all", () => {
          server.sockWrite(server.sockets, "content-changed");
        });
    }
  },

  mode: "development",
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader?url=false",
          { loader: "postcss-loader", options: { plugins: postCSSPlugins } }
        ]
      }
    ]
  }
};
