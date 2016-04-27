/**
 * typeof module.
 *
 * @module typeof
 * @version 0.0.0
 *
 * @author Richard King <richrdkng@gmail.com> [GitHub]{@link https://github.com/richrdkng}
 * @licence MIT
 */

/**
 * UMD - returnExports.js pattern
 * For more information and license, check the link below:
 * [UMD GitHub Repository]{@link https://github.com/umdjs/umd}
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.typeOf = factory();
    }
}(this, function () {
    "use strict";

    /** @var {undefined} */
    var undefined = (function() {})();

    /**
     * Returns the type of the given object.
     *
     * By default the function will return similar results to the built-in "typeof" operator, but:
     *    - when passing arrays it will return "array" as result
     *    - when passing objects, it will return "object" as result
     *
     * @example
     * // primitive types (undefined, null, Boolean, Number, String)
     * typeOf(undefined) === "undefined";
     * typeOf(null) === "null";
     * typeOf(true) === "boolean";
     * typeOf(0) === "number";
     * typeOf("string") === "string";
     *
     * // reference types (arrays, plain objects, functions, Date, RegExp and Error objects)
     * typeOf(function(){}) === "function";
     * typeOf([]) === "array";
     * typeOf({}) === "object";
     * typeOf(new Date()) === "object";
     * typeOf(new RegExp()) === "object";
     * typeOf(new Error()) === "object";
     *
     * @param {*}       object                  The object to return its type.
     * @param {boolean} specific       = false  Return the specific type of the given object.
     * @param {boolean} unmodifiedCase = false  Return the type as unmodified case.
     *                                          By default the type will be lower-case.
     *
     * @returns {string} Type of the given object.
     */
    return function typeOf(object, specific, unmodifiedCase) {
        var type,
            str;

        specific       = specific === true       ? specific       : false;
        unmodifiedCase = unmodifiedCase === true ? unmodifiedCase : false;

        if (object === undefined) {
            type = "Undefined";

        } else if (object === null) {
            type = "Null";

        } else {
            switch (typeof object) {
                case "boolean" :
                    type = "Boolean";
                    break;

                case "number" :
                    type = "Number";
                    break;

                case "string" :
                    type = "String";
                    break;

                case "object" :
                    if (!specific) {
                        if(Object.prototype.toString.call(object) === "[object Array]") {
                            type = "Array";

                        } else {
                            type = "Object";
                        }

                    } else {
                        str  = Object.prototype.toString.call(object);
                        type = str.substring(8, str.length-1);
                    }
                    break;

                case "function" :
                    type = "Function";
                    break;
            }
        }

        if (unmodifiedCase) {
            return type;
        } else {
            return type.toLowerCase();
        }
    };
}));
