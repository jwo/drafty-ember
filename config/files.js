module.exports = require(process.env["LINEMAN_MAIN"]).config.extend("files", {
  js: {
    vendor: [
    "vendor/js/jquery.js",
    "vendor/js/handlebars.runtime.js",
    "vendor/js/ember.js",
    "vendor/js/ember-data.js",
    "vendor/js/**/*.js"
    ]
  }
});
