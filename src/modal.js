import { createModal, openModal } from './functions.js';

// Check if the cookie exists, if not, create and display the initial modal
window.onload = function () {
    // if (!getCookie("modalDisplayed")) {
        createModal(); 
        openModal();
    // }
};