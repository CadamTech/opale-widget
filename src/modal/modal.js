import { logIsOver18, authRedirect } from "./api.js";
import { loadCSS } from "../styles/css.js";
import { env } from "../env.js";
import { getSessionUUID } from "../session/session.js";
import { i18n } from "../language/i18n.js";

// Fonction pour créer et afficher le modal
export async function createModal() {
  // Warm session uuid
  const sessionUUID = await getSessionUUID();

  // Create a <style> element and append the CSS rules to it
  var styleElement = document.createElement("style");
  let accumulatedStyles = "";
  const applyStyles = (module) => {
    accumulatedStyles += module;
    styleElement.textContent = accumulatedStyles;
  };

  // Load general CSS
  loadCSS(env.cssFrameWorkUrl);

  // Conditional style loading
  if (window.OPALE_THEME == "dark") {
    import("../styles/content-dark.js")
      .then((module) => applyStyles(module.style))
      .catch((error) =>
        console.error("Failed to load dark theme styles", error)
      );
  } else {
    import("../styles/content-light.js")
      .then((module) => applyStyles(module.style))
      .catch((error) =>
        console.error("Failed to load light theme styles", error)
      );
  }
  import("../styles/structure.js")
    .then((module) => applyStyles(module.style))
    .catch((error) => console.error("Failed to load structure styles", error));

  document.head.appendChild(styleElement);

  var modalContainer = document.getElementById("opale-modal-container");
  var modalContent = document.createElement("div");
  modalContent.id = "opale-modal-content";

  if (OPALE_FORMAT == "modal") {
    import("../styles/modal.js")
      .then((module) => {
        styleElement.textContent += module.modalStyle;
      })
      .catch((error) => console.error("Failed to load modal styles", error));
  }

  modalContent.innerHTML = `
          <img src="${OPALE_LOGO}" id="opale-logo">
          <h4 style="margin: 5rem 10% 5rem 10%; font-size: 1.7rem; max-width: 35rem;">${
            i18n(
              2
            ) /* This site is accessible only to persons aged 18 and over */
          }</h4>
          <div>
            <button id="over-18-button" class="button button-verification">
            <span id="over-18-text">${i18n(
              3 /* I am 18 years old or older */
            )}</span>
            <span id="loader" class="loader"></span>
            </button>
            <a href="${OPALE_CANCEL_URL}" id="not-over-18-button" class="button progress-button">${i18n(
    4 /* Exit */
  )}</a>
          </div>`;

  modalContainer.appendChild(modalContent);

  // "I'm Over 18" button
  const over18Button = document.getElementById("over-18-button");
  const over18text = document.getElementById("over-18-text");
  const loader = document.getElementById("loader");

  // EVENT LISTENER FOR CLICK ON OVER 18 BUTTON
  over18Button.addEventListener("click", function () {
    // Replace button content by a loader
    over18text.style.display = "none";
    loader.style.display = "block";
    logIsOver18(sessionUUID, OPALE_WEBSITE_ID).then(() => {
      over18text.style.display = "block";
      loader.style.display = "none";
    });
    authRedirect(sessionUUID);
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
