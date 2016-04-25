const gulp     = require("gulp"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug");

gulp.task(
    "ci",
    function(cb) {
        sequence(
            "build",
            "test"
        )(cb);
    }
);
