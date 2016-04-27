const use   = require("rekuire"),

      gulp     = require("gulp"),
      coverage = require('gulp-istanbul'),
      mocha    = require("gulp-mocha"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug"),

      Paths = use("paths");

const TYPE_DEV  = 1,
      TYPE_PROD = 2;

var type;

gulp.task("test::init-coverage", function() {
    return gulp
        .src(Paths.getPath("src") + "/typeof.js")
        .pipe(coverage())
        .pipe(coverage.hookRequire());
});

gulp.task("test::test-base", function() {
    if (type === TYPE_DEV) {
        return gulp
            .src(Paths.getPath("tests") + "/index.js", {
                read : false
            })
            .pipe(mocha({
                ui : "exports"
            }))
            .pipe(coverage.writeReports({
                dir : Paths.getPath("root") + "/coverage"
            }))
            .pipe(coverage.enforceThresholds({
                thresholds : {
                    global : 100 // enforce 100% coverage
                }
            }));

    } else {
        return gulp
            .src(Paths.getPath("tests") + "/index.js", {
                read : false
            })
            .pipe(mocha({
                ui : "exports"
            }));
    }
});

gulp.task("test::test-src-dev", function(cb) {
    Paths.addPath("test-path", Paths.getPath("src") + "/typeof.js");
    type = TYPE_DEV;

    cb();
});

gulp.task("test::test-src-prod", function(cb) {
    Paths.addPath("test-path", Paths.getPath("dist") + "/typeof.min.js");
    type = TYPE_PROD;

    cb();
});

gulp.task(
    "test::test-dev",
    sequence(
        "test::test-src-dev",
        "test::init-coverage",
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

gulp.task(
    "test",
    sequence(
        "test::test-dev",
        "test::test-prod"
    )
);
