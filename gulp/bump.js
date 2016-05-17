const use      = require("rekuire"),

      gulp     = require("gulp"),
      sequence = require("gulp-sequence"),
      debug    = require("gulp-debug"),

      semver   = require("semver"),
      json     = require("jsonfile"),
      fs       = require("graceful-fs"),

      Paths    = use("paths");

const TYPE_MAJOR = 1,
      TYPE_MINOR = 2,
      TYPE_PATCH = 3;

var type;

/**
 * Returns the current project version.
 *
 * @returns {string} Current project version in semver format.
 */
function getCurrentVersion() {
    var pkg     = use(Paths.getPath("root") + "/package.json"),
        version = pkg.version;

    if (semver.valid(version) === null) {
        throw new Error("Version in package.json is incorrect: \"" + version + "\"");
    }

    return version;
}

/**
 * Bumps the given semver version by the given type.
 *
 * @param {string} version Semver version.
 * @param {int}    type    Type of semver part. (const TYPE_*)
 *
 * @returns {string} Semver version.
 */
function bumpVersion(version, type) {
    if (semver.valid(version) === null) {
        throw new Error("Version is incorrect: \"" + version + "\"");
    }

    switch (type) {
        case TYPE_MAJOR:
            version = semver.inc(version, "major");
            break;
        case TYPE_MINOR:
            version = semver.inc(version, "minor");
            break;
        case TYPE_PATCH:
            version = semver.inc(version, "patch");
            break;
        default:
            throw new Error("Unknown version type was passed: \"" + type + "\"");
    }

    return version;
}

/**
 * Bumps the .version in package.json by the given semver version.
 *
 * @param {string} version Semver version.
 */
function bumpPackageJSON(version) {
    var path    = Paths.getPath("root") + "/package.json",
        content = json.readFileSync(path);

    content.version = version;

    json.writeFileSync(path, content, {
        spaces : 2
    });
}

/**
 * Bumps the @version in the source file by the given semver version.
 *
 * @param {string} version Semver version.
 */
function bumpSource(version) {
    var path        = Paths.getPath("src") + "/typeof.js",
        content     = fs.readFileSync(path).toString(),
        pattern     = /@version [\d\.-]+/g,
        matches     = content.match(pattern),
        replaceWith = "@version " + version;

    if (matches === null) {
        throw new Error("No @version found in: \"" + path + "\"");
    }

    if (matches.length > 1) {
        throw new Error(
            "Ambiguous number of @version found in: \"" + path + "\". " +
            "Matches: \"" + matches.length + "\""
        );
    }

    content = content.replace(pattern, replaceWith);

    fs.writeFileSync(path, content);
}

gulp.task("bump::base", function(cb) {
    var version = getCurrentVersion();

    version = bumpVersion(version, type);

    bumpSource(version);
    bumpPackageJSON(version);

    cb();
});

gulp.task("bump::set-major", function(cb) {
    type = TYPE_MAJOR;

    cb();
});

gulp.task("bump::set-minor", function(cb) {
    type = TYPE_MINOR;

    cb();
});

gulp.task("bump::set-patch", function(cb) {
    type = TYPE_PATCH;

    cb();
});

gulp.task(
    "bump::major",
    function(cb) {
        sequence(
            "bump::set-major",
            "bump::base"
        )(cb);
    }
);

gulp.task(
    "bump::minor",
    function(cb) {
        sequence(
            "bump::set-minor",
            "bump::base"
        )(cb);
    }
);

gulp.task(
    "bump::patch",
    function(cb) {
        sequence(
            "bump::set-patch",
            "bump::base"
        )(cb);
    }
);

// aliases
gulp.task("bump::main",    ["bump::major"]);
gulp.task("bump::feature", ["bump::minor"]);
gulp.task("bump::fix",     ["bump::patch"]);
