const use    = require('rekuire'),

      assert = require('assert'),

      Paths  = use("paths"),
      typeOf = use(Paths.getPath("test-path"));

module.exports = {
    "typeOf" : {
        "edge cases" : function() {
            assert(typeOf() === "undefined");
        },
        "default cases" : {
            "primitive types" : function() { // undefined, null, Boolean, Number, String
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
            },
            "cast as primitive types" : function() {
                assert(typeOf(Boolean(true))      === "boolean");
                assert(typeOf(Number(42))         === "number");
                assert(typeOf(String("a string")) === "string");
            },
            "reference types" : function() {
                assert(typeOf([])           === "array");
                assert(typeOf({})           === "object");
                assert(typeOf(function(){}) === "function");
                assert(typeOf(new Date())   === "object");
                assert(typeOf(new RegExp()) === "object");
                assert(typeOf(/s+/g)        === "object"); // inline RegExp
                assert(typeOf(new Error())  === "object");
            },
            "primitive type object wrappers" : function() { // Boolean, Number, String
                assert(typeOf(new Boolean(true))      === "object");
                assert(typeOf(new Number(42))         === "object");
                assert(typeOf(new String("a string")) === "object");
            }
        },
        "extended cases" : {
            "primitive types" : function() { // undefined, null, Boolean, Number, String
                assert(typeOf(undefined, true) === "undefined");
                assert(typeOf(null, true)      === "null");
                assert(typeOf(true, true)      === "boolean");
                assert(typeOf(false, true)     === "boolean");
                assert(typeOf(-1, true)        === "number");
                assert(typeOf(0, true)         === "number");
                assert(typeOf(1, true)         === "number");
                assert(typeOf(-Infinity, true) === "number");
                assert(typeOf(Infinity, true)  === "number");
                assert(typeOf(NaN, true)       === "number");
                assert(typeOf("", true)        === "string");
                assert(typeOf("string", true)  === "string");
            },
            "reference types" : function() {
                assert(typeOf([], true)           === "array");
                assert(typeOf({}, true)           === "object");
                assert(typeOf(function(){}, true) === "function");
                assert(typeOf(new Date(), true)   === "date");
                assert(typeOf(new RegExp(), true) === "regexp");
                assert(typeOf(/s+/g, true)        === "regexp"); // inline RegExp
                assert(typeOf(new Error(), true)  === "error");
            },
            "primitive type object wrappers" : function() { // Boolean, Number, String
                assert(typeOf(new Boolean(true), true)      === "boolean");
                assert(typeOf(new Number(42), true)         === "number");
                assert(typeOf(new String("a string"), true) === "string");
            }
        }
    }
};
