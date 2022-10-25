import express from 'express';
import thePathModule from 'path';
import ParsedQ from 'qs';

//####################################################

// The following will be utilized in the src/server.ts file

// Initialize express in order to be utilized in the server.ts file
const application: express.Application = express();

// Saving the port number 2355 in the variable called serverPortNumber
const serverPortNumber = 2356;

// Saving the localhost in the variable called localhost
const localhost = 'localhost';

// Saving the localhost '127.0.0.1' in the variable called theNumberOfTheLocalhost
const theNumberOfTheLocalhost = '127.0.0.1';

//####################################################

// The following will be utilized in the src/api/index.ts file

// Initialize Express/Router in order to be utilized in the src/api/index.ts file
const routes: express.Router = express.Router();

//####################################################

// The following will be utilized in the src/functions.ts file

// Getting and saving the directory of the project in the variable projectDirectory by utilizing the path module
// to be utilized in the function file to be utilized in the 'theCallbackFunctionOfGetOfResize' function.
/** ***This variable will also be utilized in the src/resize-Images.ts file.*** */
const projectDirectory: string = thePathModule.resolve('./');

// Saving the name of the requested image as a string
const theImageNameAsString = '';

// Saving the width of the new image as a string
const theWidthAsString = '';

// Saving the height of the new image as a string
const theHeightAsString = '';

// Saving the width of the new image as a number
const theWidthAsNumber = 0;

// Saving the height of the new image as a number
const theHeightAsNumber = 0;

// Saving the directory of the requested image as a string
const oldImageDirectory = `${projectDirectory}/Images_Provided_By_Udacity/`;

// Saving the directory of the new (after resized) image as a string
/** ***This variable will also be utilized in the src/resize-Images.ts file.*** */
const newImageDirectory = `${projectDirectory}/Images_Provided_By_Udacity_After_Resized/`;

// Saving the full directory of the requested image as a string
const fullDirectoryOfTheSelectedImage = '';

// Saving the full directory of the new (after resized) image as a string
const theNewImageAfterResized = '';

// Saving the name, width, height of the image
const requestQ: ParsedQ.ParsedQs = {};

// Saving the extension of the image name

export default {
  serverPortNumber,
  localhost,
  theNumberOfTheLocalhost,
  requestQ,
  projectDirectory,
  fullDirectoryOfTheSelectedImage,
  theNewImageAfterResized,
  oldImageDirectory,
  newImageDirectory,
  theImageNameAsString,
  theWidthAsString,
  theHeightAsString,
  theWidthAsNumber,
  theHeightAsNumber,
  routes,
  application,
};
