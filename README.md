# Form.io Protected Eval Plugin

This plugin makes [formiojs](https://github.com/formio/formio.js) library to use sandboxed eval with custom js-interpreter instead of default eval function.

Official Documentation
--------------------------
For the latest documentation, release information, and guides, always refer to the official Form.io Help Documentation available here:

**[https://help.form.io](https://help.form.io/dev/javascript-evaluator/protected-evaluator#how-to-use-the-protected-evaluator)**

## Usage

```javascript
import ProtectedEval from '@formio/protected-eval';
import { Formio } from 'formiojs';

Formio.use(ProtectedEval);
```

## Differences with classic eval

Plugin doesn't allow usage of following variables in custom scripts:

- `instance`
- `self`

There is also a performance regression when this library is used. If you have more than 100 calculated values within your form, you will see a noticable performance decrease in the runtime performance of the form.
