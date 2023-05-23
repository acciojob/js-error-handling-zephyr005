//your code here
class OutOfRangeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should only consist of integers and +-/* characters.';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'Expression should not have an invalid combination of operators.';
  }
}

function evalString(expression) {
  const operators = ['+', '-', '*', '/'];

  if (expression.match(/[^0-9+\-*/\s]/)) {
    throw new OutOfRangeError();
  }

  if (expression.match(/\+\+|--|\+\-|-\+|\*\/|\/\*|\+\*|\-\*|\*\+|\*-/)) {
    throw new InvalidExprError();
  }

  if (expression.startsWith('+') || expression.startsWith('/') || expression.startsWith('*')) {
    throw new SyntaxError('Expression should not start with an invalid operator.');
  }

  if (expression.endsWith('+') || expression.endsWith('/') || expression.endsWith('*') || expression.endsWith('-')) {
    throw new SyntaxError('Expression should not end with an invalid operator.');
  }

  return eval(expression);
}

try {
  // Test the evalString function with different expressions
  console.log(evalString('1 + 2'));  // Valid expression
  console.log(evalString('4 - 3'));  // Valid expression
  console.log(evalString('5 * -2')); // Valid expression
  console.log(evalString('6 / 2'));  // Valid expression
  console.log(evalString('1 + +2')); // Invalid expression, throws OutOfRangeError
  console.log(evalString('3 / 0'));  // Invalid expression, throws OutOfRangeError
  console.log(evalString('2++2'));   // Invalid expression, throws InvalidExprError
  console.log(evalString('+4 - 2')); // Invalid expression, throws SyntaxError
  console.log(evalString('3 * 5-')); // Invalid expression, throws SyntaxError
} catch (error) {
  console.log('Error:', error.name);
  console.log('Message:', error.message);
}
