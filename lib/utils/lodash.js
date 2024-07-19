"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lodash = void 0;
var lodash_1 = __importDefault(require("lodash"));
var lodash_2 = require("lodash");
var lodashOperators = [
    lodash_2.chunk, lodash_2.compact, lodash_2.concat, lodash_2.difference, lodash_2.differenceBy, lodash_2.differenceWith,
    lodash_2.drop, lodash_2.dropRight, lodash_2.dropRightWhile, lodash_2.dropWhile, lodash_2.findIndex, lodash_2.findLastIndex,
    lodash_2.first, lodash_2.flatten, lodash_2.flattenDeep, lodash_2.flattenDepth, lodash_2.fromPairs, lodash_2.head, lodash_2.indexOf,
    lodash_2.initial, lodash_2.intersection, lodash_2.intersectionBy, lodash_2.intersectionWith, lodash_2.join, lodash_2.last,
    lodash_2.lastIndexOf, lodash_2.nth, lodash_2.pull, lodash_2.pullAll, lodash_2.pullAllBy, lodash_2.pullAllWith, lodash_2.pullAt, lodash_2.remove,
    lodash_2.reverse, lodash_2.slice, lodash_2.sortedIndex, lodash_2.sortedIndexBy, lodash_2.sortedIndexOf, lodash_2.sortedLastIndex,
    lodash_2.sortedLastIndexBy, lodash_2.sortedLastIndexOf, lodash_2.sortedUniq, lodash_2.sortedUniqBy, lodash_2.tail,
    lodash_2.take, lodash_2.takeRight, lodash_2.takeRightWhile, lodash_2.takeWhile, lodash_2.union, lodash_2.unionBy, lodash_2.unionWith,
    lodash_2.uniq, lodash_2.uniqBy, lodash_2.uniqWith, lodash_2.unzip, lodash_2.unzipWith, lodash_2.without, lodash_2.xor, lodash_2.xorBy, lodash_2.xorWith,
    lodash_2.zip, lodash_2.zipObject, lodash_2.zipObjectDeep, lodash_2.zipWith
];
exports.lodash = lodashOperators.reduce(function (obj, operator) { return lodash_1.default.set(obj, operator.name, operator); }, {});
