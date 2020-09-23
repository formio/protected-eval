# Form.io Protected Eval Plugin

This plugin makes [formiojs](https://github.com/formio/formio.js) library to use sandboxed eval with custom js-interpreter instead of default eval function.

## Usage

```javascript
import { use } from '@formio/core';
import ProtectedEval from '@formio/protected-eval';

use(ProtectedEval);
```

## Differences with classic eval

Plugin doesn't allow usage of following variables in custom scripts:

- `instance`
- `self`
- `options`
