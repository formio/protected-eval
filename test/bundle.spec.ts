import {JSDOM} from 'jsdom';
import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';

describe('Bundle', () => {
  it('should expose ProtectedEval on the window object', () => {
    const bundlePath = path.resolve('dist/protected-eval.js');
    if (!fs.existsSync(bundlePath)) {
      throw new Error('Bundle not found. Please run "npm run build" first.');
    }
    const bundleCode = fs.readFileSync(bundlePath, 'utf8');

    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      runScripts: 'dangerously',
      resources: 'usable'
    });
    const {window} = dom;

    // Mock Formio which is an external
    (window as any).Formio = {
      Utils: {
        evaluate: () => {},
        Evaluator: {
          evaluator: () => {},
          evaluate: () => {}
        }
      },
      DefaultEvaluator: class {}
    };

    // Execute the bundle in the JSDOM context
    const script = window.document.createElement('script');
    script.textContent = bundleCode;
    window.document.body.appendChild(script);

    assert.notStrictEqual((window as any).ProtectedEval, undefined, 'window.ProtectedEval should be defined');
    assert.strictEqual(typeof (window as any).ProtectedEval, 'object', 'window.ProtectedEval should be an object');
    assert.notStrictEqual((window as any).ProtectedEval.evaluator, undefined, 'window.ProtectedEval.evaluator should be defined');
  });
});
