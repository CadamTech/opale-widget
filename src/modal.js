import { createModal, openModal } from './functions/modal.js';
import { loadCSS } from './functions/css.js';
import { env } from './env.js';

function getQueryParam(url, name) {
  name = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Check if the cookie exists, if not, create and display the initial modal
window.onload = function () {

    // Get the current script element (the one that was just loaded)
    const currentScript = document.currentScript;
    console.log(currentScript)

    // Check if the script element exists and has a 'src' attribute
    if (currentScript && currentScript.src) {
        // Extract the 'key' query parameter from the script URL
        const apiKey = getQueryParam(currentScript.src, 'key');

        // Check if the apiKey is not null and not empty
        if (apiKey) {
            // Now you can use the apiKey variable in your code
            console.log('API Key:', apiKey);
        } else {
            console.error('API Key not found in the script URL.');
        }
    } else {
        console.error('Unable to access the current script element.');
    }

    createModal(); 
    openModal();
    // Load Milligram CSS
    loadCSS(env.cssFrameWorkUrl);
};