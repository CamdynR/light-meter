// meter.js

const K = 14 // Also sometimes 12.5

/**
 * Calculates the required aperature for a given image
 * @param {number} iso ISO film speed
 * @param {number} luminance Average scene luminance
 * @param {number} exposureTime Exposure time in seconds
 */
function requiredAperature(iso, luminance, exposureTime) {
  return Math.sqrt((luminance * iso * exposureTime) / K);
}

/**
 * Calculates the required shutter speed for a given image
 * @param {number} iso ISO film speed
 * @param {number} luminance Average scene luminance
 * @param {number} aperature Relative aperature (f-number)
 */
function requiredShutterSpeed(iso, luminance, aperature) {
  return (K * Math.pow(aperature, 2)) / (luminance * iso);
}

/**
 * Calculates the required film speed (ISO) for a given image
 * @param {number} luminance Average scene luminance
 * @param {number} aperature Relative aperature (f-number)
 * @param {number} iso ISO film speed
 */
function requiredISO(luminance, aperature, exposureTime) {
  return (K * Math.pow(aperature, 2)) / (luminance * exposureTime);
}

export default {
  requiredAperature,
  requiredShutterSpeed,
  requiredISO
};