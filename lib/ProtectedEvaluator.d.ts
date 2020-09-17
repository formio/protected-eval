export interface IEvaluator {
    noeval?: boolean;
    protectedEval?: boolean;
    evaluator: (func: string | any, ...params: any[]) => () => any;
    evaluate: (func: string | any, args: any, ...rest: any[]) => any;
}
declare const Evaluator: IEvaluator;
export default Evaluator;
