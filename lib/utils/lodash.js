"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lodash = void 0;
var get_1 = __importDefault(require("lodash/get"));
var keys_1 = __importDefault(require("lodash/keys"));
var values_1 = __importDefault(require("lodash/values"));
exports.lodash = {
    get: get_1.default,
    keys: keys_1.default,
    values: values_1.default,
};
