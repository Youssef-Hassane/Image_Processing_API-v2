import server from '../server';
import supertest from 'supertest';

const testingTheRequestOfTheServer: supertest.SuperTest<supertest.Test> =
  supertest(server);

describe(
  'Test the Endpoint of the "src/routes/api/resize.ts" file with different parameter (values):',
  callbackFunctionOfTest
);
// /api/resize?imageName=icelandwaterfall&width=300&height=300
function callbackFunctionOfTest(): void {
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" without the image name',
    noImageName
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" without the width of the new image',
    noWidthForTheNewImage
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" without the height of the new image',
    noHeightForTheNewImage
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with the extension of the image',
    userEnteredTheExtensionOfTheImage
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with a none number in the width',
    userDidNotEnteredTheWidthAsNumber
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with a none number in the height',
    userDidNotEnteredTheHeightAsNumber
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with a negative number in the width',
    userEnteredTheWidthAsNegativeNumber
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with a negative number in the height',
    userDidNotEnteredTheHeightAsNegativeNumber
  );
  it(
    'Testing the "/api/resize" Endpoint\n     Testing the "resize" with an image name that doesn\'t Exist',
    userSelectedNoneExistedImage
  );
}

// returnIfTheStringIsEmptyForImageName()
async function noImageName(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=&width=300&height=300'
  );
  expect(theRequest.status).toBe(411);
}
// returnIfTheStringIsEmptyForWidth()
async function noWidthForTheNewImage(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=&height=300'
  );
  expect(theRequest.status).toBe(411);
}
// returnIfTheStringIsEmptyForHeight()
async function noHeightForTheNewImage(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=300&height='
  );
  expect(theRequest.status).toBe(411);
}
// returnIfTheImageNameIncludesTheExtension()v
async function userEnteredTheExtensionOfTheImage(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall.jpg&width=300&height=300'
  );
  expect(theRequest.status).toBe(400);
}
// returnIfTheEnteredValueIsNumberForWidth()
async function userDidNotEnteredTheWidthAsNumber(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=aa&height=300'
  );
  expect(theRequest.status).toBe(400);
}
// returnIfTheEnteredValueIsNumberForHeight()
async function userDidNotEnteredTheHeightAsNumber(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=300&height=aa'
  );
  expect(theRequest.status).toBe(400);
}
// returnIfTheWidthNumberNegative();
async function userEnteredTheWidthAsNegativeNumber(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=-300&height=300'
  );
  expect(theRequest.status).toBe(400);
}
// returnIfTheHeightNumberNegative();
async function userDidNotEnteredTheHeightAsNegativeNumber(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=icelandwaterfall&width=300&height=-300'
  );
  expect(theRequest.status).toBe(400);
}
// returnIfTheSelectedImageIsNotExisted();
async function userSelectedNoneExistedImage(): Promise<void> {
  const theRequest: supertest.Response = await testingTheRequestOfTheServer.get(
    '/api/resize?imageName=water&width=300&height=300'
  );
  expect(theRequest.status).toBe(404);
}
