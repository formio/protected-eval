"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var formiojs_1 = require("formiojs");
var lodash_1 = require("./utils/lodash");
var baseEvaluate = formiojs_1.Utils.evaluate;
formiojs_1.Utils.evaluate = function evaluate(func, args, ret, tokenize) {
    var rest = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rest[_i - 4] = arguments[_i];
    }
    if (!formiojs_1.Utils.Evaluator.protectedEval || typeof func !== 'string') {
        return baseEvaluate.apply(void 0, __spreadArray([func, args, ret, tokenize], rest, false));
    }
    var returnVal = null;
    var component = args.component ? args.component : { key: 'unknown' };
    if (!args.form && args.instance) {
        args.form = lodash_1.lodash.get(args.instance, 'root._form', {});
    }
    var componentKey = component.key;
    if (ret) {
        func += ";return ".concat(ret);
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
        returnVal = formiojs_1.Utils.Evaluator.evaluate(func, __assign(__assign({}, args), { _: lodash_1.lodash }));
    }
    catch (err) {
        console.warn("An error occured within the custom function for ".concat(componentKey), err);
        returnVal = null;
        func = false;
    }
    return returnVal;
};
exports.default = formiojs_1.Utils;
