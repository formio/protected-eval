import {Utils as FormioUtils} from '@formio/js';

import {lodash as _} from './utils/lodash';

const baseEvaluate = FormioUtils.evaluate;
FormioUtils.evaluate = function evaluate(func, args, ret, tokenize, ...rest) {
  if (!FormioUtils.Evaluator.protectedEval || typeof func !== 'string') {
    return baseEvaluate(func, args, ret, tokenize, ...rest);
  }

  let returnVal = null;
  const component = args.component ? args.component : {key: 'unknown'};
  if (!args.form && args.instance) {
    args.form = _.get(args.instance, 'root._form', {});
  }

  const componentKey = component.key;

  if (ret) {
    func += `;return ${ret}`;
  }

  if (tokenize) {
    // Replace all {{ }} references with actual data.
    func = func.replace(/({{\s+(.*)\s+}})/, (__match, __$1, $2) => {
      if ($2.indexOf('data.') === 0) {
        return _.get(args.data, $2.replace('data.', ''));
      }
      else if ($2.indexOf('row.') === 0) {
        return _.get(args.row, $2.replace('row.', ''));
      }

      return _.get(args.data, $2);
    });
  }

  try {
    returnVal = (FormioUtils.Evaluator as any).evaluate(func, {...args, _});
  }
  catch (err) {
    console.warn(`An error occured within the custom function for ${componentKey}`, err);
    returnVal = null;
    (func as any) = false;
  }

  return returnVal;
}

export default FormioUtils;
