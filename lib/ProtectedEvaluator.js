"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formiojs_1 = require("formiojs");
var js_interpreter_1 = __importDefault(require("js-interpreter"));
var baseEvaluator = formiojs_1.Utils.Evaluator.evaluator;
var baseEvaluate = formiojs_1.Utils.Evaluator.evaluate;
var excludedVariables = ['instance', 'self', 'options'];
var Evaluator = {
    noeval: true,
    protectedEval: true,
    evaluator: function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!Evaluator.protectedEval) {
            return baseEvaluator.apply(void 0, __spreadArray([func], params, false));
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
            return baseEvaluate.apply(void 0, __spreadArray([func, args], rest, false));
        }
        func = "result = (function() {".concat(func, "})()");
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
        var result = interpreter.getProperty(interpreter.globalObject, 'result');
        return interpreter.pseudoToNative(result);
    },
};
exports.default = Evaluator;
