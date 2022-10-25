import functions from '../functions';

// Test the function that is in the "src/functions.ts" file, except the theCallbackFunctionOfGetOfResize function
describe(
  'Test the function that is in the "src/functions.ts" file:',
  callbackFunctionOfTest
);

function callbackFunctionOfTest(): void {
  it(
    'Testing the "theObjectIsEmpty" function\n     theObjectIsEmpty(emptyObject) should be false',
    emptyObject
  );
  it(
    'Testing the "theObjectIsEmpty" function\n     theStringIsEmpty(emptyString) should be true',
    variableOfTypeStringIsEmpty
  );
  it(
    'Testing the "theObjectIsEmpty" function\n     checkIfTheEnteredValueIsNumber(variableOfTypeNumber) should be true',
    isTheInputOfTypeNumber
  );
}

// function theObjectIsEmpty(object: object);
function emptyObject(): void {
  const emptyObject: object = {};
  expect(functions.theObjectIsEmpty(emptyObject)).toBeFalse;
}
// function theStringIsEmpty(variable: string);
function variableOfTypeStringIsEmpty(): void {
  const emptyString = '';
  expect(functions.theStringIsEmpty(emptyString)).toBeTrue;
}
// function checkIfTheEnteredValueIsNumber(number: string | number | ParsedQs | string[] | ParsedQs[] | undefined);
function isTheInputOfTypeNumber(): void {
  const variableOfTypeNumber = 12;
  expect(functions.checkIfTheEnteredValueIsNumber(variableOfTypeNumber))
    .toBeTrue;
}
