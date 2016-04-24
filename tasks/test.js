const use   = require("rekuire"),

      gulp     = require("gulp"),
      mocha    = require("gulp-mocha"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug"),

      Paths = use("paths");

gulp.task("test::test-src-dev", function(cb) {
    Paths.addPath("test-path", Paths.getPath("src") + "/typeof.js");
    cb();
});

gulp.task("test::test-src-prod", function(cb) {
    Paths.addPath("test-path", Paths.getPath("dist") + "/typeof.min.js");
    cb();
});

gulp.task("test::test-base", function() {
    return gulp
        .src(Paths.getPath("tests") + "/index.js", {
            read : false
        })
        .pipe(mocha({
            ui : "exports"
        }));
});

gulp.task(
    "test::test-dev",
    sequence(
        "test::test-src-dev",
        "test::test-base"
    )
);

gulp.task(
    "test::test-prod",
    sequence(
        "test::test-src-prod",
        "test::test-base"
    )
);
