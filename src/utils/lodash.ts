import _ from 'lodash';

import {lodashOperators} from '@formio/js/lib/cjs/utils/jsonlogic/operators';

export const lodash = lodashOperators.reduce((obj, operator) => _.set(obj, operator, _[operator]), {});
