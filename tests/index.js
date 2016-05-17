const use    = require('rekuire'),

      assert = require('assert'),

      Paths  = use("paths"),
      typeOf = use(Paths.getPath("test-path"));

module.exports = {
    "typeOf" : {
        "default cases" : {
            // undefined, null, boolean, number, string, symbol
            "primitive types" : {
                "typeOf(<object>, :default, :default)" : function() {
                    assert(typeOf(undefined) === "undefined");
                    assert(typeOf(null)      === "null");
                    assert(typeOf(true)      === "boolean");
                    assert(typeOf(false)     === "boolean");
                    assert(typeOf(-1)        === "number");
                    assert(typeOf(0)         === "number");
                    assert(typeOf(1)         === "number");
                    assert(typeOf(-Infinity) === "number");
                    assert(typeOf(Infinity)  === "number");
                    assert(typeOf(NaN)       === "number");
                    assert(typeOf("")        === "string");
                    assert(typeOf("string")  === "string");
                    assert(typeOf(Symbol())  === "symbol");
                },
                "typeOf(<object>, true, :default)" : function() {
                    assert(typeOf(undefined, true) === "undefined");
                    assert(typeOf(null,      true) === "null");
                    assert(typeOf(true,      true) === "boolean");
                    assert(typeOf(false,     true) === "boolean");
                    assert(typeOf(-1,        true) === "number");
                    assert(typeOf(0,         true) === "number");
                    assert(typeOf(1,         true) === "number");
                    assert(typeOf(-Infinity, true) === "number");
                    assert(typeOf(Infinity,  true) === "number");
                    assert(typeOf(NaN,       true) === "number");
                    assert(typeOf("",        true) === "string");
                    assert(typeOf("string",  true) === "string");
                    assert(typeOf(Symbol(),  true) === "symbol");
                },
                "typeOf(<object>, true, true)" : function() {
                    assert(typeOf(undefined, true, true) === "Undefined");
                    assert(typeOf(null,      true, true) === "Null");
                    assert(typeOf(true,      true, true) === "Boolean");
                    assert(typeOf(false,     true, true) === "Boolean");
                    assert(typeOf(-1,        true, true) === "Number");
                    assert(typeOf(0,         true, true) === "Number");
                    assert(typeOf(1,         true, true) === "Number");
                    assert(typeOf(-Infinity, true, true) === "Number");
                    assert(typeOf(Infinity,  true, true) === "Number");
                    assert(typeOf(NaN,       true, true) === "Number");
                    assert(typeOf("",        true, true) === "String");
                    assert(typeOf("string",  true, true) === "String");
                    assert(typeOf(Symbol(),  true, true) === "Symbol");
                },
                "typeOf(<object>, false, true)" : function() {
                    assert(typeOf(undefined, false, true) === "Undefined");
                    assert(typeOf(null,      false, true) === "Null");
                    assert(typeOf(true,      false, true) === "Boolean");
                    assert(typeOf(false,     false, true) === "Boolean");
                    assert(typeOf(-1,        false, true) === "Number");
                    assert(typeOf(0,         false, true) === "Number");
                    assert(typeOf(1,         false, true) === "Number");
                    assert(typeOf(-Infinity, false, true) === "Number");
                    assert(typeOf(Infinity,  false, true) === "Number");
                    assert(typeOf(NaN,       false, true) === "Number");
                    assert(typeOf("",        false, true) === "String");
                    assert(typeOf("string",  false, true) === "String");
                    assert(typeOf(Symbol(),  false, true) === "Symbol");
                }
            },
            "cast as primitive types" : {
                "typeOf(<object>, :default, :default)" : function() {
                    assert(typeOf(Boolean(true))      === "boolean");
                    assert(typeOf(Number(42))         === "number");
                    assert(typeOf(String("a string")) === "string");
                },
                "typeOf(<object>, true, :default)" : function() {
                    assert(typeOf(Boolean(true),      true) === "boolean");
                    assert(typeOf(Number(42),         true) === "number");
                    assert(typeOf(String("a string"), true) === "string");
                },
                "typeOf(<object>, true, true)" : function() {
                    assert(typeOf(Boolean(true),      true, true) === "Boolean");
                    assert(typeOf(Number(42),         true, true) === "Number");
                    assert(typeOf(String("a string"), true, true) === "String");
                },
                "typeOf(<object>, false, true)" : function() {
                    assert(typeOf(Boolean(true),      false, true) === "Boolean");
                    assert(typeOf(Number(42),         false, true) === "Number");
                    assert(typeOf(String("a string"), false, true) === "String");
                }
            },
            "reference types" : {
                "typeOf(<object>, :default, :default)" : function() {
                    assert(typeOf([])           === "array");
                    assert(typeOf({})           === "object");
                    assert(typeOf(function(){}) === "function");
                    assert(typeOf(new Date())   === "date");
                    assert(typeOf(new RegExp()) === "regexp");
                    assert(typeOf(/s+/g)        === "regexp"); // inline RegExp
                    assert(typeOf(new Error())  === "error");
                },
                "typeOf(<object>, true, :default)" : function() {
                    assert(typeOf([],           true) === "array");
                    assert(typeOf({},           true) === "object");
                    assert(typeOf(function(){}, true) === "function");
                    assert(typeOf(new Date(),   true) === "date");
                    assert(typeOf(new RegExp(), true) === "regexp");
                    assert(typeOf(/s+/g,        true) === "regexp"); // inline RegExp
                    assert(typeOf(new Error(),  true) === "error");
                },
                "typeOf(<object>, true, true)" : function() {
                    assert(typeOf([],           true, true) === "Array");
                    assert(typeOf({},           true, true) === "Object");
                    assert(typeOf(function(){}, true, true) === "Function");
                    assert(typeOf(new Date(),   true, true) === "Date");
                    assert(typeOf(new RegExp(), true, true) === "RegExp");
                    assert(typeOf(/s+/g,        true, true) === "RegExp"); // inline RegExp
                    assert(typeOf(new Error(),  true, true) === "Error");
                },
                "typeOf(<object>, false, true)" : function() {
                    assert(typeOf([],           false, true) === "Array");
                    assert(typeOf({},           false, true) === "Object");
                    assert(typeOf(function(){}, false, true) === "Function");
                    assert(typeOf(new Date(),   false, true) === "Date");
                    assert(typeOf(new RegExp(), false, true) === "RegExp");
                    assert(typeOf(/s+/g,        false, true) === "RegExp"); // inline RegExp
                    assert(typeOf(new Error(),  false, true) === "Error");
                }
            }
        },
        "extended cases" : {
            "primitive type object wrappers" : {
                "typeOf(<object>, :default, :default)" : function() {
                    assert(typeOf(new Boolean(true))      === "object");
                    assert(typeOf(new Number(42))         === "object");
                    assert(typeOf(new String("a string")) === "object");
                },
                "typeOf(<object>, true, :default)" : function() {
                    assert(typeOf(new Boolean(true),      true) === "boolean");
                    assert(typeOf(new Number(42),         true) === "number");
                    assert(typeOf(new String("a string"), true) === "string");
                },
                "typeOf(<object>, true, true)" : function() {
                    assert(typeOf(new Boolean(true),      true, true) === "Boolean");
                    assert(typeOf(new Number(42),         true, true) === "Number");
                    assert(typeOf(new String("a string"), true, true) === "String");
                },
                "typeOf(<object>, false, true)" : function() {
                    assert(typeOf(new Boolean(true),      false, true) === "Object");
                    assert(typeOf(new Number(42),         false, true) === "Object");
                    assert(typeOf(new String("a string"), false, true) === "Object");
                }
            },
            "typed arrays" : {
                "typeOf(<object>, :default, :default)" : function() {
                    assert(typeOf(new Int8Array(0))         === "typedarray");
                    assert(typeOf(new Uint8Array(0))        === "typedarray");
                    assert(typeOf(new Uint8ClampedArray(0)) === "typedarray");
                    assert(typeOf(new Int16Array(0))        === "typedarray");
                    assert(typeOf(new Uint16Array(0))       === "typedarray");
                    assert(typeOf(new Int32Array(0))        === "typedarray");
                    assert(typeOf(new Uint32Array(0))       === "typedarray");
                    assert(typeOf(new Float32Array(0))      === "typedarray");
                    assert(typeOf(new Float64Array(0))      === "typedarray");
                },
                "typeOf(<object>, true, :default)" : function() {
                    assert(typeOf(new Int8Array(0),         true) === "int8array");
                    assert(typeOf(new Uint8Array(0),        true) === "uint8array");
                    assert(typeOf(new Uint8ClampedArray(0), true) === "uint8clampedarray");
                    assert(typeOf(new Int16Array(0),        true) === "int16array");
                    assert(typeOf(new Uint16Array(0),       true) === "uint16array");
                    assert(typeOf(new Int32Array(0),        true) === "int32array");
                    assert(typeOf(new Uint32Array(0),       true) === "uint32array");
                    assert(typeOf(new Float32Array(0),      true) === "float32array");
                    assert(typeOf(new Float64Array(0),      true) === "float64array");
                },
                "typeOf(<object>, true, true)" : function() {
                    assert(typeOf(new Int8Array(0),         true, true) === "Int8Array");
                    assert(typeOf(new Uint8Array(0),        true, true) === "Uint8Array");
                    assert(typeOf(new Uint8ClampedArray(0), true, true) === "Uint8ClampedArray");
                    assert(typeOf(new Int16Array(0),        true, true) === "Int16Array");
                    assert(typeOf(new Uint16Array(0),       true, true) === "Uint16Array");
                    assert(typeOf(new Int32Array(0),        true, true) === "Int32Array");
                    assert(typeOf(new Uint32Array(0),       true, true) === "Uint32Array");
                    assert(typeOf(new Float32Array(0),      true, true) === "Float32Array");
                    assert(typeOf(new Float64Array(0),      true, true) === "Float64Array");
                },
                // also "typeOf(<object>, :default, true)"
                "typeOf(<object>, false, true)" : function() {
                    assert(typeOf(new Int8Array(0),         false, true) === "TypedArray");
                    assert(typeOf(new Uint8Array(0),        false, true) === "TypedArray");
                    assert(typeOf(new Uint8ClampedArray(0), false, true) === "TypedArray");
                    assert(typeOf(new Int16Array(0),        false, true) === "TypedArray");
                    assert(typeOf(new Uint16Array(0),       false, true) === "TypedArray");
                    assert(typeOf(new Int32Array(0),        false, true) === "TypedArray");
                    assert(typeOf(new Uint32Array(0),       false, true) === "TypedArray");
                    assert(typeOf(new Float32Array(0),      false, true) === "TypedArray");
                    assert(typeOf(new Float64Array(0),      false, true) === "TypedArray");
                }
            }
        },
        "edge cases" : {
            // calling without arguments
            "typeOf(<:empty>, :default, :default)" : function() {
                assert(typeOf() === "undefined");
            }
        }
    }
};
