import {Utils as FormioUtils} from '@formio/js';
import Interpreter from '@formio/js-interpreter';

const baseEvaluator = (FormioUtils.Evaluator as any).evaluator;
const baseEvaluate = (FormioUtils.Evaluator as any).evaluate;

export interface IEvaluator {
  noeval?: boolean;
  protectedEval?: boolean;
  evaluator: (func: string | any, ...params: any[]) => () => any;
  evaluate: (func: string | any, args: any, ...rest: any[]) => any;
}

const excludedVariables = ['instance', 'self', 'options'];

const Evaluator: IEvaluator = {
  noeval: true,
  protectedEval: true,
  evaluator: (func: string | any, ...params: any[]): () => any => {
    if (!Evaluator.protectedEval) {
      return baseEvaluator(func, ...params);
    }

    console.warn('No evaluations allowed for safe eval.');
    return () => undefined;
  },
  evaluate: (func: string | any, args: any, ...rest: any[]): any => {
    if (!Evaluator.protectedEval || typeof func !== 'string') {
      return baseEvaluate(func, args, ...rest);
    }

    func = `result = (function() {${func}})()`;
    const initFunc = function(interpreter, globalObject) {
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
  },
};

export default Evaluator;
