/**
 * @overview A utility function to fix and extend the built-in "typeof" operator of JavaScript.
 *
 * @module js/util/typeof
 * @version 1.0.1
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
    /* istanbul ignore next: ignore coverage test for UMD */
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.typeOf = factory();
    }
}(this, function () {
    "use strict";

    /**
     * Returns the type of the given object.
     *
     * By default the function will return similar results to the built-in "typeof" operator, but:
     *    - when passing arrays it will return "array" as result
     *    - when passing objects, it will return "object" as result
     *
     * @function typeOf
     *
     * @param {*}       object                The object to return its type.
     * @param {boolean} [specificType=false]  Return the specific type of the given object.
     * @param {boolean} [originalCase=false]  Return the type as unmodified case.
     *                                        By default the type will be lower-case.
     *
     * @returns {string} Type of the given object.
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
     */
    return function typeOf(object, specificType, originalCase) {
        var type = typeof object,
            str  = Object.prototype.toString.call(object),
            acquireCtor;

        specificType = specificType === true ? specificType : false;
        originalCase = originalCase === true ? originalCase : false;

        if (!originalCase) {
            if (type === "object") {
                if (object === null) {
                    type = "null";
                } else {
                    switch (str) {
                        case "[object Date]" :
                            type = "date";
                            break;

                        case "[object RegExp]" :
                            type = "regexp";
                            break;

                        case "[object Error]" :
                            type = "error";
                            break;
                    }
                }
            }

        } else {
            if (type === "undefined") {
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

                    case "symbol" :
                        type = "Symbol";
                        break;

                    case "function" :
                        type = "Function";
                        break;
                }
            }
        }

        if (!specificType) {
            if (object !== null && type === "object") {
                if (str === "[object Array]") {
                    if (!originalCase) {
                        type = "array";
                    } else {
                        type = "Array";
                    }

                } else if (str === "[object Object]") {
                    if (originalCase) {
                        type = "Object";
                    }

                } else if (
                    object instanceof Int8Array ||
                    object instanceof Uint8Array ||
                    object instanceof Uint8ClampedArray ||
                    object instanceof Int16Array ||
                    object instanceof Uint16Array ||
                    object instanceof Int32Array ||
                    object instanceof Uint32Array ||
                    object instanceof Float32Array ||
                    object instanceof Float64Array
                ) {
                    if (!originalCase) {
                        type = "typedarray";
                    } else {
                        type = "TypedArray";
                    }

                } else if (
                    str === "[object Boolean]" ||
                    str === "[object Number]" ||
                    str === "[object String]"
                ) {
                    if (!originalCase) {
                        type = "object";
                    } else {
                        type = "Object";
                    }

                } else {
                    acquireCtor = true;
                }
            }
        } else {
            acquireCtor = true;
        }

        if (acquireCtor) {
            type = str.substring(8, str.length-1);

            if (!originalCase) {
                type = type.toLowerCase();
            }
        }

        return type;
    };
}));
