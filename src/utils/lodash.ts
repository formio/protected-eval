import _ from 'lodash';
import { 
    chunk, compact, concat, difference, differenceBy, differenceWith,
    drop, dropRight, dropRightWhile, dropWhile, findIndex, findLastIndex,
    first, flatten, flattenDeep, flattenDepth, fromPairs, head, indexOf,
    initial, intersection, intersectionBy, intersectionWith, join, last,
    lastIndexOf, nth, pull, pullAll, pullAllBy, pullAllWith, pullAt, remove,
    reverse, slice, sortedIndex, sortedIndexBy, sortedIndexOf, sortedLastIndex,
    sortedLastIndexBy, sortedLastIndexOf, sortedUniq, sortedUniqBy, tail,
    take, takeRight, takeRightWhile, takeWhile, union, unionBy, unionWith,
    uniq, uniqBy, uniqWith, unzip, unzipWith, without, xor, xorBy, xorWith,
    zip, zipObject, zipObjectDeep, zipWith
} from 'lodash';
  
const lodashOperators = [
    chunk, compact, concat, difference, differenceBy, differenceWith,
    drop, dropRight, dropRightWhile, dropWhile, findIndex, findLastIndex,
    first, flatten, flattenDeep, flattenDepth, fromPairs, head, indexOf,
    initial, intersection, intersectionBy, intersectionWith, join, last,
    lastIndexOf, nth, pull, pullAll, pullAllBy, pullAllWith, pullAt, remove,
    reverse, slice, sortedIndex, sortedIndexBy, sortedIndexOf, sortedLastIndex,
    sortedLastIndexBy, sortedLastIndexOf, sortedUniq, sortedUniqBy, tail,
    take, takeRight, takeRightWhile, takeWhile, union, unionBy, unionWith,
    uniq, uniqBy, uniqWith, unzip, unzipWith, without, xor, xorBy, xorWith,
    zip, zipObject, zipObjectDeep, zipWith
];

export const lodash = lodashOperators.reduce((obj, operator) => _.set(obj, operator.name, operator), {});


