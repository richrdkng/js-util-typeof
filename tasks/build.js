const use     = require("rekuire"),

      gulp     = require("gulp"),
      remove   = require("del"),
      rename   = require("gulp-rename"),
      compress = require("gulp-uglify"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug"),

      Paths   = use("paths");

gulp.task("build::clear-dist", function(cb) {
    var dist = Paths.getPath("dist");

    remove(
        [
            dist + "/**/.*", // include . (dot) files and folders
            dist + "/**/*"
        ],
        {
            force : true
        }
    )
    .then(
        // success
        function() {
            cb();
        },
        // error
        function() {
            console.log(arguments);
            cb();
        }
    );
});

gulp.task("build::compress", function() {
    return gulp
        .src(Paths.getPath("src") + "/typeof.js")
        .pipe(rename({
            basename : "typeof.min"
        }))
        .pipe(compress())
        .pipe(gulp.dest(Paths.getPath("dist")))
});

gulp.task(
    "build",
    function(cb) {
        sequence(
            "build::clear-dist",
            "build::compress"
        )(cb);
    }
);

Paths.appendToPath("watch", Paths.getPath("src") + "/**/*.js");
