import theExpressModule from 'express';
import theFileModule from 'fs';
import { ParsedQs } from 'qs';
import theResizingTheSelectedImage_Function from './resize-Images';
import variable from './variables';

// This is the callback function of the listen method that is in the src/server.ts file
// This function will display some text in the terminal when the server is running.
function theCallbackFunctionOfListenOfServer(): void {
  console.log('Please wait..');
  setTimeout(() => {
    console.log('just a few seconds...');
  }, 1000);
  setTimeout(() => {
    console.log(`The server is running on port ${variable.serverPortNumber}`);
  }, 2000);
  setTimeout(() => {
    console.log('You can open the browser, and enter the following URL:');
  }, 3000);
  setTimeout(() => {
    console.log(
      `  http://${variable.theNumberOfTheLocalhost}:${variable.serverPortNumber}/\n  OR \n  http://${variable.localhost}:${variable.serverPortNumber}/`
    );
  }, 4000);
}

function callbackFunctionForRoutes(
  request: theExpressModule.Request,
  resolve: theExpressModule.Response
) {
  resolve.send(
    'Hi there, This image processing API was developed by Youssef Hassane, and this is the first project of the advanced track (Web Development Advanced) that is provided by Udacity. The project is about an image processing API (Application Programming Interface). In order to utilize it you need to enter three thing the name of the image, the width of the new image, and the height of the new image. For example: For example: http://localhost:2355/api/resize?imageName=fjord&width=300&height=300'
  );
}

// This function will check if the object is empty or not.
function theObjectIsEmpty(object: object): boolean {
  for (const _element in object) {
    return false;
  }
  return true;
}

// This function will check if the variable of type string is empty or not.
function theStringIsEmpty(variable: string): boolean {
  if (variable.length === 0) {
    return true;
  } else {
    return false;
  }
}

// This function will check if the input is a number or not.
function checkIfTheEnteredValueIsNumber(
  number: string | number | ParsedQs | string[] | ParsedQs[] | undefined
): boolean {
  if (Number.isNaN(number)) {
    return true;
  } else {
    return false;
  }
}

// This function will create directory for the new image if there is no one exist.
function createDirectoryForTheNewImageIfNotExists(Directory: string): void {
  if (theFileModule.existsSync(Directory) == false) {
    return theFileModule.mkdirSync(Directory);
  }
}

// This is a callback async function of the listen method that is in the src/routes/api/resize.ts file
// This function will do the following:
// "Accessing the provided URL with image information should successfully resize an image and
// save it to disk on first access, then pull from disk on subsequent access attempts (Caching)" (Udacity, n.d., para. #).
async function theCallbackFunctionOfGetOfResize(
  request: theExpressModule.Request,
  resolve: theExpressModule.Response
) {
  variable.requestQ = request.query;

  const { imageName } = variable.requestQ;
  const { width } = request.query;
  const { height } = variable.requestQ;

  variable.theImageNameAsString = String(imageName);
  variable.theWidthAsString = String(width);
  variable.theHeightAsString = String(height);
  variable.theWidthAsNumber = Number(width);
  variable.theHeightAsNumber = Number(height);

  console.log(
    `
##############################################################################################
##                              A Request Has Been Made                                     ##
##############################################################################################
    `
  );
  console.log('The user requested the following:');
  console.log(variable.requestQ);

  variable.fullDirectoryOfTheSelectedImage = `${variable.projectDirectory}/Images_Provided_By_Udacity/${imageName}.jpg`;

  variable.theNewImageAfterResized = `${variable.newImageDirectory}${variable.theImageNameAsString}-NEW-${variable.theWidthAsNumber}x${variable.theHeightAsNumber}.jpg`;

  console.log(`
    The full directory of the selected image:\n
    ${variable.fullDirectoryOfTheSelectedImage}`);

  console.log(`
    The directory of the requested (input) image is:\n 
    ${variable.oldImageDirectory}\n
    The directory of the new (output) image is:\n 
    ${variable.newImageDirectory}
    `);

  switch (true) {
    case theObjectIsEmpty(variable.requestQ):
      returnIfTheObjectIsEmpty();
      break;
    case theStringIsEmpty(variable.theImageNameAsString):
      returnIfTheStringIsEmptyForImageName();
      break;
    case theStringIsEmpty(variable.theWidthAsString):
      returnIfTheStringIsEmptyForWidth();
      break;
    case theStringIsEmpty(variable.theHeightAsString):
      returnIfTheStringIsEmptyForHeight();
      break;
    case getTheExtensionOfTheImageName(variable.theImageNameAsString):
      returnIfTheImageNameIncludesTheExtension();
      break;
    case checkIfTheEnteredValueIsNumber(variable.theWidthAsNumber):
      returnIfTheEnteredValueIsNumberForWidth();
      break;
    case checkIfTheEnteredValueIsNumber(variable.theHeightAsNumber):
      returnIfTheEnteredValueIsNumberForHeight();
      break;
    case variable.theWidthAsNumber < 0:
      returnIfTheWidthNumberNegative();
      break;
    case variable.theHeightAsNumber < 0:
      returnIfTheHeightNumberNegative();
      break;
    case checkIfTheSelectedImageIsExistedFunction(
      variable.fullDirectoryOfTheSelectedImage
    ):
      returnIfTheSelectedImageIsNotExisted();
      break;
  }

  // function that check if the name of the image include any extension
  function getTheExtensionOfTheImageName(image_Name: string): boolean {
    // Array for all the image extension that the user may entered by accident
    const nameName = [
      'JPG',
      'PNG',
      'GIF',
      'WEBP',
      'TIFF',
      'PSD',
      'RAW',
      'BMP',
      'HEIF',
      'INDD',
      'JPEG',
      'SVG',
      'AI',
      'EPS',
      'PDF',
      'jpg',
      'png',
      'gif',
      'webp',
      'tiff',
      'psd',
      'raw',
      'bmp',
      'heif',
      'indd',
      'jpeg',
      'svg',
      'ai',
      'eps',
      'pdf',
    ];

    // Getting the extension
    const extensions: string = image_Name.split('.').pop() ?? '';

    // Check if the name of the image include any extension
    if (nameName.includes(String(extensions))) {
      return true;
    } else {
      return false;
    }
  }

  // Checking if the selected image is existed
  function checkIfTheSelectedImageIsExistedFunction(
    Directory: string
  ): boolean {
    if (theFileModule.existsSync(Directory) == false) {
      return true;
    }
    return false;
  }

  // creating a directory for the new image if there is no one
  createDirectoryForTheNewImageIfNotExists(variable.newImageDirectory);

  if (theFileModule.existsSync(variable.theNewImageAfterResized) == false) {
    await theResizingTheSelectedImage_Function(
      variable.theImageNameAsString,
      variable.theWidthAsNumber,
      variable.theHeightAsNumber
    );
    resolve.sendFile(variable.theNewImageAfterResized);
  } else if (
    theFileModule.existsSync(variable.theNewImageAfterResized) == true
  ) {
    resolve.sendFile(variable.theNewImageAfterResized);
  }

  // Return function for the switch
  function returnIfTheObjectIsEmpty(): object {
    console.log(
      `You must enter the name, the width, and height of the image \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(200)
      .send(
        `You must enter the name, the width, and height of the image. For example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheStringIsEmptyForImageName(): object {
    console.log(
      `Sorry, the image name is missing... \nPlease, try again and this time enter the image name. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(411)
      .send(
        `Sorry, the image name is missing... Please, try again and this time enter the image name. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheStringIsEmptyForWidth(): object {
    console.log(
      `Sorry, the width of the image is missing... \nPlease, try again and this time enter the width. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(411)
      .send(
        `Sorry, the width of the image is missing... Please, try again and this time enter the width. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheStringIsEmptyForHeight(): object {
    console.log(
      `Sorry, the height of the image is missing... \nPlease, try again and this time enter the height. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(411)
      .send(
        `Sorry, the height of the image is missing... Please, try again and this time enter the height. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheImageNameIncludesTheExtension(): object {
    console.log(
      `Sorry, the image name that you have entered include the extension of the image.\n Please, try again and this time enter the name without the extension.\n For example:\n http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(400)
      .send(
        `Sorry, the image name that you have entered include the extension of the image. Please, try again and this time enter the name without the extension. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheEnteredValueIsNumberForWidth(): object {
    console.log(
      `Sorry, the width of the image that you have entered is not a number (${width} is not a number). \nPlease, try again and this time enter a number. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(400)
      .send(
        `Sorry, the width of the image that you have entered is not a number (${width} is not a number). Please, try again and this time enter a number. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheEnteredValueIsNumberForHeight(): object {
    console.log(
      `Sorry, the height of the image that you have entered is not a number (${height} is not a number). \nPlease, try again and this time enter a number. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(400)
      .send(
        `Sorry, the height of the image that you have entered is not a number (${height} is not a number). Please, try again and this time enter a number. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheWidthNumberNegative(): object {
    console.log(
      `Sorry, the width of the image that you have entered is a negative number (${width} is a negative number). \nPlease, try again and this time enter a positive number. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(400)
      .send(
        `Sorry, the width of the image that you have entered is a negative number (${width} is a negative number). Please, try again and this time enter a positive number. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheHeightNumberNegative(): object {
    console.log(
      `Sorry, the height of the image that you have entered is a negative number (${height} is a negative number). \nPlease, try again and this time enter a positive number. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(400)
      .send(
        `Sorry, the height of the image that you have entered is a negative number (${height} is a negative number). Please, try again and this time enter a positive number. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
  function returnIfTheSelectedImageIsNotExisted(): object {
    console.log(
      `Sorry, the image that you have entered does not exist in the specified directory \nPlease, try again and this time enter the right directory. \nFor example: \nhttp://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
    );
    return resolve
      .status(404)
      .send(
        `Sorry, the image that you have entered does not exist in the specified directory . Please, try again and this time enter the right directory. For example: http://localhost:${variable.serverPortNumber}/api/resize?imageName=fjord&width=300&height=300`
      );
  }
}

export default {
  theCallbackFunctionOfListenOfServer,
  callbackFunctionForRoutes,
  theObjectIsEmpty,
  theStringIsEmpty,
  createDirectoryForTheNewImageIfNotExists,
  theCallbackFunctionOfGetOfResize,
  checkIfTheEnteredValueIsNumber,
};
