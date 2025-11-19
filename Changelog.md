## 2.0.1-rc.1
### Changed
 - FIO-10822: fixed an issue where evaluations donot work if returned variable is in middle of the custom logic or is not 'value'
 - FIO-10653: Fixed issue where the function declaration may mess up the evaluator if there is a return in the statement
 - fix this binding in module-scoped variables

## 2.0.0
### Changed
 - Official Release
 - FIO-9942 protected eval extends default eval new
 - FIO-9942: update import of DefaultEvaluator class to keep it out of formUtils
 - FIO-9942: assign result value from evaluated function
 - Increment major version
 - Upgrade to latest 5.x renderer
 - FIO-8506: Gh Action To Publish Protected Eval
 - FIO-9199: update js-interpreter
 - fix typescript errors, update dependencies

## 1.2.2
### Fixed
 - FIO-4917: Fixes options variable caused stack overflow

### Changed
 - Upgrade dependencies.

## 1.2.0
### Changed
 - Upgrade JSInterpreter to include custom methods.

## 1.1.0
### Changed
 - Convert lodash to object in order to use it within js-interpreter

