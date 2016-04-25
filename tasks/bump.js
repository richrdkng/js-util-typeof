const use   = require("rekuire"),

      gulp     = require("gulp"),
      bump     = require("gulp-bump"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug"),

      Paths = use("paths");

var type;

gulp.task("bump::base", function() {
    const root = Paths.getPath("root");

    return gulp
        .src(root + "/package.json")
        .pipe(bump({
            type : type
        }))
        .pipe(gulp.dest(root));
});

gulp.task("bump::set-major", function(cb) {
    type = "major";
    cb();
});

gulp.task("bump::set-minor", function(cb) {
    type = "minor";
    cb();
});

gulp.task("bump::set-patch", function(cb) {
    type = "patch";
    cb();
});

gulp.task(
    "bump::major",
    function(cb) {
        sequence(
            "build::set-major",
            "build::base"
        )(cb);
    }
);

gulp.task(
    "bump::minor",
    function(cb) {
        sequence(
            "build::set-minor",
            "build::base"
        )(cb);
    }
);

gulp.task(
    "bump::patch",
    function(cb) {
        sequence(
            "build::set-patch",
            "build::base"
        )(cb);
    }
);

// aliases
gulp.task("bump::main",    "bump::major");
gulp.task("bump::feature", "bump::minor");
gulp.task("bump::fix",     "bump::patch");
