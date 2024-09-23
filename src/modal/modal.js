import { logIsOver18, authRedirect } from "./api.js";
import { i18n } from "../language/i18n.js";

// Fonction pour créer et afficher le modal
export async function createModal() {
  // Create a <style> element and append the CSS rules to it
  var styleElement = document.createElement("style");
  let accumulatedStyles = "";
  const applyStyles = (module) => {
    accumulatedStyles += module;
    styleElement.textContent = accumulatedStyles;
  };

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

  var modalContainer = document.getElementById("opale-modal-container");
  var modalContent = document.createElement("div");
  modalContent.id = "opale-modal-content";
  modalContent.style.transform = "scale(0)";

  if (window.OPALE_FORMAT == "modal") {
    import("../styles/modal.js")
      .then((module) => applyStyles(module.style))
      .catch((error) => console.error("Failed to load modal styles", error));
  }

  document.head.appendChild(styleElement);

  modalContent.innerHTML = `
          <img src="${OPALE_LOGO}" id="opale-logo">
          <h2 id="over-18-title">${
            i18n(
              2
            ) /* This site is accessible only to persons aged 18 and over */
          }</h2>
          <div class="buttons-container">
         
            <button id="over-18-button" class="verification-button">
            <span id="over-18-text">${i18n(
              3 /* I am 18 years old or older */
            )}</span>
            <span id="loader" class="loader"></span>
            </button>
            <a href="${OPALE_CANCEL_URL}" id="not-over-18-button" class="back-button">${i18n(
    4 /* Exit */
  )}</a>
            <div id="poweredByOpale">
              <span>Powered by</span>
              <img id="opaleLogo" src="https://d39fhua4pjj742.cloudfront.net/logo/opale-logo-no-bg.png" alt="Opale.io">
            </div>
          </div>`;

  modalContainer.appendChild(modalContent);

  // "I'm Over 18" button
  const over18Button = document.getElementById("over-18-button");
  const over18text = document.getElementById("over-18-text");
  const loader = document.getElementById("loader");
  const poweredByOpale = document.getElementById("poweredByOpale");

  // EVENT LISTENER FOR CLICK ON OVER 18 BUTTON
  over18Button.addEventListener("click", function () {
    // Replace button content by a loader
    over18text.style.display = "none";
    loader.style.display = "block";
    logIsOver18().then(() => {
      over18text.style.display = "block";
      loader.style.display = "none";
    });
    authRedirect();
  });

  setTimeout(() => {
    modalContent.style.transform = "scale(1)";
  }, 100);

  poweredByOpale.addEventListener("click", function () {
    window.open("https://opale.io/", "_blank");
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
