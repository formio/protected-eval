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
var utils_1 = __importDefault(require("formiojs/utils"));
var Evaluator_1 = __importDefault(require("formiojs/utils/Evaluator"));
var lodash_1 = require("./utils/lodash");
var baseEvaluate = utils_1.default.evaluate;
utils_1.default.evaluate = function evaluate(func, args, ret, tokenize) {
    var rest = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rest[_i - 4] = arguments[_i];
    }
    if (!Evaluator_1.default.protectedEval || typeof func !== 'string') {
        return baseEvaluate.apply(void 0, __spreadArrays([func, args, ret, tokenize], rest));
    }
    var returnVal = null;
    var component = args.component ? args.component : { key: 'unknown' };
    if (!args.form && args.instance) {
        args.form = lodash_1.lodash.get(args.instance, 'root._form', {});
    }
    var componentKey = component.key;
    if (ret) {
        func += ";return " + ret;
    }
    if (tokenize) {
        // Replace all {{ }} references with actual data.
        func = func.replace(/({{\s+(.*)\s+}})/, function (__match, __$1, $2) {
            if ($2.indexOf('data.') === 0) {
                return lodash_1.lodash.get(args.data, $2.replace('data.', ''));
            }
            else if ($2.indexOf('row.') === 0) {
                return lodash_1.lodash.get(args.row, $2.replace('row.', ''));
            }
            return lodash_1.lodash.get(args.data, $2);
        });
    }
    try {
        returnVal = Evaluator_1.default.evaluate(func, args);
    }
    catch (err) {
        console.warn("An error occured within the custom function for " + componentKey, err);
        returnVal = null;
        func = false;
    }
    return returnVal;
};
exports.default = utils_1.default;
