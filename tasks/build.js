const use     = require("rekuire"),

      gulp     = require("gulp"),
      remove   = require("del"),
      rename   = require("gulp-rename"),
      compress = require("gulp-uglify"),
      header   = require("gulp-header"),
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

gulp.task("build::build", function() {
    var pkg = use("package.json");

    return gulp
        .src(Paths.getPath("src") + "/typeof.js")
        .pipe(rename({
            basename : "typeof.min"
        }))
        .pipe(compress())
        .pipe(header(
            "/* <%= pkg.name %> v<%= pkg.version %> | (c) <%= pkg.license %> @ <%= pkg.author %> */\n",
            {
                pkg : pkg
            }
        ))
        .pipe(gulp.dest(Paths.getPath("dist")))
});

gulp.task(
    "build",
    function(cb) {
        sequence(
            "build::clear-dist",
            "build::build"
        )(cb);
    }
);

Paths.appendToPath("watch", Paths.getPath("src") + "/**/*.js");
