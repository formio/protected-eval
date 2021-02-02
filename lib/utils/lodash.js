"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lodash = void 0;
var lodash_1 = __importDefault(require("lodash"));
var operators_1 = require("formiojs/utils/jsonlogic/operators");
exports.lodash = operators_1.lodashOperators.reduce(function (obj, operator) { return lodash_1.default.set(obj, operator, lodash_1.default[operator]); }, {});
