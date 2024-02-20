// main.js

import METER from './meter.js';

/*****************/
/*** CONSTANTS ***/
/*****************/

// Store DOM element references
const ELEMS = {
  video: undefined,
  luminanceOutput: undefined,
};
const OPTIONS = {
  aperature: [],
  shutterSpeed: [],
  iso: [],
};
const REFS = {
  canvas: undefined,
  ctx: undefined,
};
const VIDEO_DETAILS = {
  height: 0, // will be set later
  width: 320, // default, change later
  streaming: false,
};
const POLLING_INTERVAL = 250; // ms in-between luminance polls
// Create a canvas element to use late
const CANVAS = document.createElement('canvas');

/*********************/
/*** PROGRAM LOGIC ***/
/*********************/

init();

// Initializes the application
async function init() {
  queryElements();
  await initializeVideoStream();
  initializeLuminancePoll();
}

/**
 * Query all the needed elements so only needs to happen once
 */
function queryElements() {
  ELEMS.video = document.querySelector('video');
  ELEMS.luminanceOutput = document.querySelector('output');
  ELEMS.aperature = document.querySelector('#aperature');
  ELEMS.shutterSpeed = document.querySelector('#shutter-speed');
  ELEMS.iso = document.querySelector('#iso');
  // Create number arrays from the options
  OPTIONS.aperature = [...ELEMS.aperature.options].map((e) => Number(e.value));
  OPTIONS.shutterSpeed = [...ELEMS.shutterSpeed.options].map((e) =>
    Number(e.value)
  );
  OPTIONS.iso = [...ELEMS.iso.options].map((e) => Number(e.value));
}

/**
 * Initializes the video stream with the webcam and sets the size
 * of the video once stream has started
 */
async function initializeVideoStream() {
  let [initStream, initVideoSize] = [false, false];

  return new Promise(async (resolve, reject) => {
    // Initialize the video stream
    try {
      let streamOpts = {
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      };
      let stream = await navigator.mediaDevices.getUserMedia(streamOpts);
      ELEMS.video.srcObject = stream;

      let selectedCamera = stream.getVideoTracks()[0];
      // Resolve if finished
      initStream = true;
      if (initStream && initVideoSize) resolve();
    } catch (err) {
      console.error(`Trouble getting user media: ${err}`);
      reject(err);
    }

    // Update the video dimensions once a video is streaming
    ELEMS.video.addEventListener(
      'canplay',
      () => {
        if (!VIDEO_DETAILS.streaming) {
          // Grab the correct aspect ratio
          VIDEO_DETAILS.height =
            ELEMS.video.videoHeight / ELEMS.video.videoWidth;
          VIDEO_DETAILS.height *= VIDEO_DETAILS.width;
          // Set attributes
          ELEMS.video.setAttribute('width', VIDEO_DETAILS.width);
          ELEMS.video.setAttribute('height', VIDEO_DETAILS.height);
          VIDEO_DETAILS.streaming = true;

          // Resolve if finished
          initVideoSize = true;
          if (initStream && initVideoSize) resolve();
        }
      },
      false
    );
  });
}

function pollLuminance() {
  // Draw the video still to the canvas' context
  REFS.ctx.drawImage(ELEMS.video, 0, 0, REFS.canvas.width, REFS.canvas.height);

  // Get the pixel data
  let data = REFS.ctx.getImageData(
    0,
    0,
    REFS.canvas.width,
    REFS.canvas.height
  )?.data;

  // Calculate luminosity for each pixel
  let luminositySum = 0;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;

    // Calculate the luminosity using the Digital ITU BT.601 formula
    // That formula is: Y = 0.299 R + 0.587 G + 0.114 B
    let y = 0.299 * r + 0.587 * g + 0.114 * b;

    // Add total to sum
    luminositySum += y;
  }

  // Calculate the average luminosity
  let avgRelativeLum = luminositySum / (REFS.canvas.width * REFS.canvas.height);

  // Update the DOM
  ELEMS.luminanceOutput.textContent = avgRelativeLum.toFixed(10);

  let luminance = avgRelativeLum * 100;
  let aperature = ELEMS.aperature.value;
  let shutterSpeed = ELEMS.shutterSpeed.value;
  let iso = ELEMS.iso.value;

  let suggestedShutterSpeed = METER.requiredShutterSpeed(
    iso,
    luminance,
    aperature
  );
  let aperatureIndex = findClosestIndex(
    OPTIONS.shutterSpeed,
    suggestedShutterSpeed
  );
  ELEMS.shutterSpeed.selectedIndex = aperatureIndex;
}

/**
 * Initializes the poll for the webcam image's luminance value. This
 * value is updated on screen.
 */
function initializeLuminancePoll() {
  // Initialize the canvas first
  REFS.canvas = document.createElement('canvas');
  REFS.ctx = REFS.canvas.getContext('2d', { willReadFrequently: true });
  // Ensure the dimensions match
  REFS.canvas.width = ELEMS.video.width;
  REFS.canvas.height = ELEMS.video.height;

  pollLuminance();
  setInterval(pollLuminance, POLLING_INTERVAL);
}

/************************/
/*** HELPER FUNCTIONS ***/
/************************/

/**
 * Searches through a sorted array of numbers to find the index of the
 * number that is the closest to the given number
 * @param {array<number>} arr Sorted array of numbers to search
 * @param {number} n The number to search the array for the closest
 */
function findClosestIndex(arr, n) {
  let closest = arr.reduce((prev, curr) =>
    Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev
  );
  return arr.indexOf(closest);
}
