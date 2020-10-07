"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formiojs_1 = require("formiojs");
var js_interpreter_1 = __importDefault(require("js-interpreter"));
var baseEvaluator = formiojs_1.Utils.Evaluator.evaluator;
var baseEvaluate = formiojs_1.Utils.Evaluator.evaluate;
var excludedVariables = ['instance', 'self'];
var Evaluator = {
    noeval: true,
    protectedEval: true,
    evaluator: function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!Evaluator.protectedEval) {
            return baseEvaluator.apply(void 0, __spreadArrays([func], params));
        }
        console.warn('No evaluations allowed for safe eval.');
        return function () { return undefined; };
    },
    evaluate: function (func, args) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        if (!Evaluator.protectedEval || typeof func !== 'string') {
            return baseEvaluate.apply(void 0, __spreadArrays([func, args], rest));
        }
        func = "result = (function() {" + func + "})()";
        var initFunc = function (interpreter, globalObject) {
            Object.keys(args).forEach(function (variable) {
                // Exclude variables which have circular references
                if (excludedVariables.indexOf(variable) !== -1) {
                    return;
                }
                var pseudoValue = interpreter.nativeToPseudo(args[variable]);
                interpreter.setProperty(globalObject, variable, pseudoValue);
            });
            interpreter.setProperty(globalObject, 'result', null);
        };
        var interpreter = new js_interpreter_1.default(func, initFunc);
        interpreter.run();
        return interpreter.getProperty(interpreter.globalObject, 'result');
    },
};
exports.default = Evaluator;
