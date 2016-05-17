const path    = require("path"),
      appRoot = require("app-root-path");

function isArray(object) {
    return Object.prototype.toString.call(object) === "[object Array]";
}

function arrayMerge(array) {
    return array.concat.apply(
        array,
        Array.prototype.slice.call(arguments, 1)
    );
}

const Paths = function() {
    const root = path.normalize(appRoot.toString());

    this.addPath("root",  root);
    this.addPath("dist",  path.normalize(root + "/dist"));
    this.addPath("doc",   path.normalize(root + "/doc"));
    this.addPath("src",   path.normalize(root + "/src"));
    this.addPath("tests", path.normalize(root + "/tests"));
};

    Paths.prototype = {
        constructor : Paths,

        _paths : {},

        addPath : function(name, glob) {
            this._paths[name] = glob;
        },
        getPath : function(name) {
            if (!(name in this._paths)) {
                throw new Error("The given path cannot be found: \"" + name +"\"");
            }

            return this._paths[name];
        },
        appendToPath : function(name, glob) {
            if (!(name in this._paths)) {
                this._paths[name] = glob;

            } else {
                var path = this._paths[name];

                if (!isArray(path)) {
                    path = [path];
                }

                if (isArray(glob)) {
                    path = arrayMerge(path, glob);
                } else {
                    path.push(glob);
                }

                this._paths[name] = path;
            }

        },
        getAll : function() {
            return this._paths;
        }
    };

module.exports = new Paths();
