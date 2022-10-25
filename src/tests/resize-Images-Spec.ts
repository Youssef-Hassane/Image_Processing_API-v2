import theResizingTheSelectedImage_Function from '../resize-Images';
import variable from '../variables';
import theFileModule from 'fs';

describe(
  'Test the resizingTheSelectedImage function of the "src/resize-Images.ts" file with different parameter (values):',
  callbackFunctionOfTest
);

function callbackFunctionOfTest(): void {
  it(
    'Testing the \'resizingTheSelectedImage\' function\n     Testing the "resizingTheSelectedImage function" with correct value',
    theResizingTheSelectedImage
  );
}

async function theResizingTheSelectedImage() {
  const imageName = 'icelandwaterfall';
  const theWidthOfTheNewImage = 350;
  const theHeightOfTheNewImage = 350;
  theResizingTheSelectedImage_Function(
    imageName,
    theWidthOfTheNewImage,
    theHeightOfTheNewImage
  );
  expect(theFileModule.existsSync(variable.theNewImageAfterResized)).toBeTrue;
}
