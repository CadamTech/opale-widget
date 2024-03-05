import {
  logIsOver18,
  authRedirect,
} from "./api.js";
import { modalStyles } from "../styles/modal.js";
import { modalContentDarkStyles } from "../styles/content-dark.js";
import { modalContentLightStyles } from "../styles/content-light.js";
import { modalContentStructure } from "../styles/structure.js";
import { getSessionUUID, generateSessionUUID } from "../session/session.js";
import { i18n } from "../language/i18n.js";


// Create a <style> element and append the CSS rules to it
var styleElement = document.createElement("style");

if (typeof OPALE_THEME !== "undefined") {
  if (OPALE_THEME == "dark") {
    styleElement.textContent = modalContentDarkStyles;
  } else if (OPALE_THEME == "light") {
    styleElement.textContent = modalContentLightStyles;
  }
}

styleElement.textContent += modalContentStructure;

// add modal styles to current styles
if (OPALE_FORMAT == "modal") styleElement.textContent += modalStyles;

document.head.appendChild(styleElement);

// Fonction pour créer et afficher le modal
export async function createModal() {
  // Warm identity providers
  const sessionUUID = await getSessionUUID();

  var modalContainer = document.getElementById("opale-modal-container");
  var modalContent = document.createElement("div");
  modalContent.id = "opale-modal-content";

    modalContent.innerHTML = `
          <img src="${OPALE_LOGO}" id="opale-logo">
          <h4 style="margin:10%">${
            i18n(
              2
            ) /* This site is accessible only to persons aged 18 and over */
          }</h4>
          <div>
            <button id="over-18-button" class="button button-verification">${i18n(
              3 /* I am 18 years old or older */
            )}</button>
            <a href="https://google.com" id="not-over-18-button" class="button progress-button">${i18n(
              4 /* Exit */
            )}</a>
          </div>`;

    modalContainer.appendChild(modalContent);

    // Add "I'm Over 18" button
    var over18Button = document.getElementById("over-18-button");

    // EVENT LISTENER FOR CLICK ON OVER 18 BUTTON
    over18Button.addEventListener("click", function () {
      // Replace button content by a loader
      over18Button.innerHTML = '<span class="loader"></span>';
      logIsOver18(sessionUUID, OPALE_WEBSITE_ID);
      authRedirect(sessionUUID)
    });

    // BEFORE UNLOAD : MONITOR DROP
    window.addEventListener("beforeunload", function () {
      // Generate and store a new sessionUID before the tab is closed
      localStorage.setItem("sessionUID", generateSessionUUID());
    });
}

// Function to open modal
export function openModal() {
  var modal = document.getElementById("opale-modal-container");
  modal.style.display = "flex";
}

// Function to close modal
export function closeModal() {
  var modal = document.getElementById("opale-modal-container");
  modal.style.display = "none";
}
