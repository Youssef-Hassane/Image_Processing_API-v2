import sharp from 'sharp';
import variable from './variables';

// The following async function will receive the name of the image, the width of the new image, and the height of the new image.
// By utilizing the sharp module The function will resize the requested image and produce the new image with the new width and height.
async function resizingTheSelectedImage(
  // The image name, the width of the new image, and the height of the new image parameters
  imageName: string,
  theWidthOfTheNewImage: number,
  theHeightOfTheNewImage: number
): Promise<void> {
  try {
    // The directory of the requested image
    await sharp(
      `${variable.projectDirectory}/Images_Provided_By_Udacity/${imageName}.jpg`
    )
      // The new width and height of the new image
      .resize(theWidthOfTheNewImage, theHeightOfTheNewImage)
      // The extension is jpeg
      .jpeg()
      // The directory of the new image
      .toFile(
        `${variable.newImageDirectory}${imageName}-NEW-${theWidthOfTheNewImage}x${theHeightOfTheNewImage}.jpg`
      );
  } catch (error) {
    // Catching error
    console.log(
      `
=======================================================================
||       Something went wrong. Please read the above message         ||
=======================================================================
    `
    );
  }
}

// Export the function resizingTheSelectedImage in order to be utilized in the src/functions.ts file
export default resizingTheSelectedImage;
