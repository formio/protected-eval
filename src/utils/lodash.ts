import _ from 'lodash';

import {lodashOperators} from 'formiojs/utils/jsonlogic/operators';

export const lodash = lodashOperators.reduce((obj, operator) => _.set(obj, operator, _[operator]), {});
