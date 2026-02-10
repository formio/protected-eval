import {Utils as FormioUtils, DefaultEvaluator} from '@formio/js';
import Interpreter from '@formio/js-interpreter';

const baseEvaluator = FormioUtils.Evaluator.evaluator.bind(FormioUtils.Evaluator);
const baseEvaluate = FormioUtils.Evaluator.evaluate.bind(FormioUtils.Evaluator);

export interface IEvaluator {
  noeval?: boolean;
  protectedEval?: boolean;
  evaluator: (func: string | any, ...params: any[]) => () => any;
  evaluate: (func: string | any, args: any, ...rest: any[]) => any;
}

const excludedVariables = ['instance', 'self', 'options'];

export class Evaluator extends DefaultEvaluator {
  noeval = true;
  protectedEval = true;

  evaluator(func: string | any, ...params: any[]): () => any {
    if (!this.protectedEval) {
      return baseEvaluator(func, ...params);
    }

    console.warn('No evaluations allowed for safe eval.');
    return () => undefined;
  };

  evaluate(func: string | any, args: any, ...rest: any[]): any {
    if (!this.protectedEval || typeof func !== 'string') {
      return baseEvaluate(func, args, ...rest);
    }

  
    if (func.indexOf(' return ') === -1) {
      const returnedVariable = rest[0] || 'value';
      func = `result = (function() { var ${returnedVariable}; ${func}; return ${returnedVariable}; })()`;
    }
    else {
      func = `result = (function() { ${func} })()`;
    }
    const initFunc = function (interpreter, globalObject) {
      Object.keys(args).forEach((variable) => {
        // Exclude variables which have circular references
        if (excludedVariables.indexOf(variable) !== -1) {
          return;
        }

        const pseudoValue = interpreter.nativeToPseudo(args[variable]);
        interpreter.setProperty(globalObject, variable, pseudoValue);
      });

      interpreter.setProperty(globalObject, 'result', null);
    };

    const interpreter = new Interpreter(func, initFunc);
    interpreter.run();
    const result = interpreter.getProperty(interpreter.globalObject, 'result');
    return interpreter.pseudoToNative(result);
  };
}

export default new Evaluator();
