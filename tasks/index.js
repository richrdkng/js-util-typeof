const use   = require("rekuire"),

      gulp  = require("gulp"),
      debug = require("gulp-debug"),

      Paths = use("paths");

use("tasks/build");
use("tasks/test");
use("tasks/watch");
use("tasks/bump");
use("tasks/ci");

// the default task is left here for quick testing purposes
gulp.task("default", function() {
    var src = Paths.getPath("src");

    return gulp
        .src([
            src + "/**/.*", // include . (dot) files and folders
            src + "/**/*"
        ])
        .pipe(debug());
});
