import { createModal, openModal } from './functions/modal.js';
import { loadCSS } from './functions/css.js';
import { env } from './env.js';

// Check if the cookie exists, if not, create and display the initial modal
window.onload = function () {
    createModal(); 
    openModal();
    // Load Milligram CSS
    loadCSS(env.cssFrameWorkUrl);
};