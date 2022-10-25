import server from '../server';
import supertest from 'supertest';

// Testing the request of the server
const testingTheRequestOfTheServer: supertest.SuperTest<supertest.Test> =
  supertest(server);

describe('Test the Endpoint of the src/server.ts file', callbackFunctionOfTest);

function callbackFunctionOfTest(): void {
  it(
    'Testing the "/api" Endpoint\n     Gets the "/api" Endpoint',
    callbackAsyncFunctionOfTestAPI
  );
}

async function callbackAsyncFunctionOfTestAPI(): Promise<void> {
  const theResponse: supertest.Response =
    await testingTheRequestOfTheServer.get('/api');
  expect(theResponse.status).toBe(200);
}
