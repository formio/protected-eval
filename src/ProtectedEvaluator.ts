import {Utils} from '@formio/core';
import Interpreter from 'js-interpreter';

const baseEvaluator = (Utils.Evaluator as any).evaluator;
const baseEvaluate = (Utils.Evaluator as any).evaluate;

export interface IEvaluator {
  noeval?: boolean;
  evaluator: (func: string | any, ...params: any[]) => () => any;
  evaluate: (func: string | any, args: any, ...rest: any[]) => any;
}

const excludedVariables = ['instance', 'self', 'options'];

const Evaluator: IEvaluator = {
  noeval: true,
  evaluator: (func: string | any, ...params: any[]): () => any => {
    if (!Evaluator.noeval) {
      return baseEvaluator(func, ...params);
    }

    console.warn('No evaluations allowed for protected eval.');
    return () => undefined;
  },
  evaluate: (func: string | any, args: any, ...rest: any[]): any => {
    if (!Evaluator.noeval || typeof func !== 'string') {
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
    return interpreter.getProperty(interpreter.globalObject, 'result');
  },
};

export default Evaluator;
