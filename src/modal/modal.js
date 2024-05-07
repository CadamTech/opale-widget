import { logIsOver18, authRedirect } from "./api.js";
import { loadCSS } from "../styles/css.js";
import { env } from "../env.js";
import { getSessionUUID, generateSessionUUID } from "../session/session.js";
import { i18n } from "../language/i18n.js";

// Fonction pour créer et afficher le modal
export async function createModal() {
  // Warm session uuid
  const sessionUUID = await getSessionUUID();

  // Create a <style> element and append the CSS rules to it
  var styleElement = document.createElement("style");
  loadCSS(env.cssFrameWorkUrl);

  if (OPALE_THEME == "dark") {
    import("../styles/content-dark.js").then((module) => {
      styleElement.textContent = module.darkStyle;
    });
  } else {
    import("../styles/content-light.js").then((module) => {
      styleElement.textContent = module.lightStyle;
    });
  }

  import("../styles/structure.js").then((module) => {
    styleElement.textContent += module.styleStructue;
  });

  document.head.appendChild(styleElement);

  var modalContainer = document.getElementById("opale-modal-container");
  var modalContent = document.createElement("div");
  modalContent.id = "opale-modal-content";

  if (OPALE_FORMAT == "modal") {
    import("../styles/modal.js").then((module) => {
      styleElement.textContent += module.modalStyle;
    });
  }

  modalContent.innerHTML = `
          <img src="${OPALE_LOGO}" id="opale-logo">
          <h4 style="margin: 5rem 10% 5rem 10%; font-size: 1.7rem; max-width: 35rem;">${
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
    authRedirect(sessionUUID);
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
