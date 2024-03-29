import {
  getIdentityProviders,
  pickIdentityProvider,
  logIsOver18,
  authPopup,
  authRedirect,
} from "./api.js";
import { displayVerificationSuccessPage } from "../continuePage/continuePage.js";
import { modalStyles } from "../styles/modal.js";
import { modalContentDarkStyles } from "../styles/content-dark.js";
import { modalContentLightStyles } from "../styles/content-light.js";
import { modalContentStructure } from "../styles/structure.js";
import { getSessionUUID, generateSessionUUID } from "../session/session.js";
import { i18n } from "../language/i18n.js";
import { env } from "../env.js";
import { checkIfWebAuthnISAvailable, fingerPrintIcon } from "./utils.js";

// check if browser allows passkeys
const isWebAuthnAvailable = await checkIfWebAuthnISAvailable();

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

async function waitForIdentityProviders(sessionUUID) {
  const identityProviders = await getIdentityProviders(sessionUUID);
  showVerificationOptions(identityProviders);
}

// Fonction pour créer et afficher le modal
export async function createModal() {
  // Warm identity providers
  const sessionUUID = await getSessionUUID();

  var modalContainer = document.getElementById("opale-modal-container");
  var modalContent = document.createElement("div");
  modalContent.id = "opale-modal-content";
  const hasClickedOver18 = sessionStorage.getItem("opale-clicked-over-18");

  if (OPALE_FORMAT == "inline" || hasClickedOver18 === "true") {
    waitForIdentityProviders(sessionUUID);
    modalContainer.appendChild(modalContent);
  } else {
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
      sessionStorage.setItem("opale-clicked-over-18", "true");
      logIsOver18(sessionUUID, OPALE_WEBSITE_ID);
      waitForIdentityProviders(sessionUUID);
    });

    // BEFORE UNLOAD : MONITOR DROP
    window.addEventListener("beforeunload", function () {
      // Generate and store a new sessionUID before the tab is closed
      localStorage.setItem("sessionUID", generateSessionUUID());
    });
  }
}

// Fonction pour afficher les options de vérification
export async function showVerificationOptions(identityProviders) {
  const params = new URLSearchParams(window.location.search);
  const failureMessage = params.has("opale-verif-failed")
    ? `${i18n(5) /* Verification failed, please try again. */}<br>`
    : "";

  const sessionUUID = await getSessionUUID();

  var modalContent = document.getElementById("opale-modal-content");

  var html = `
        <div class="verification-options-container">
        <div class="verification-options-content">
          ${
            typeof OPALE_LOGO !== "undefined"
              ? `<img src="${OPALE_LOGO}" id="opale-logo">`
              : ""
          }
          <h5 style="margin-bottom: 1rem;">${failureMessage}${
    i18n(6) /* Choose one of the following options to verify your age. */
  }</h5>
          <div class="verification-options">
                ${identityProviders
                  .map(
                    (identityProvider) => `
                      <div class="verification-option" id="${
                        identityProvider.name
                      }-button">
                        <img src="${identityProvider.logo}" alt="${
                      identityProvider.name
                    }">
                        <a class="button button-verification">${i18n(
                          identityProvider.description_translation
                        )}</a>
                      </div>`
                  )
                  .join("")}
            </div>
            
          <div class="progress-buttons-container" style="grid-template-columns: 1fr ${
            isWebAuthnAvailable && "1fr"
          };">
          ${
            OPALE_FORMAT == "modal"
              ? `<button id="back-button-openmodal" class="progress-button">
            ${i18n(10 /* Back */)}</button>`
              : `<div></div>`
          }
          ${
            isWebAuthnAvailable
              ? `<button id="authentication-button" class="progress-button">passkey${fingerPrintIcon}
                <span class="tooltip">${i18n(19)}</span></button>`
              : `<div></div>`
          }
          </div>

          <p>
            <small>
              ${i18n(7 /* Verifications are secure and anonymized by */)}
            <a href="https://opale.io" target="_blank">Opale.io </a><br>
              ${i18n(8 /* By using this service, you agree to our */)}
            <a href="https://opale.io/fr/politique-de-confidentialite/" target="_blank">
              ${i18n(9 /* Privacy Policy */)}</a>
            </small>
          </p>

          </div>
          </div>

        <div id="verification-iframe-container" style="display:none; flex-direction: column; align-items: center; justify-content: center;">
        <div class="loader-container" style="display:none !important;justify-content:center !important;align-items:center !important;padding: 30%">
            <span class="loader"></span>
          </div>
          <iframe id="verification-iframe" allow="camera" width="100%" height="300px" style="max-width: 600px"></iframe>
          <button id="back-button" class="progress-button" style="margin-top: 1rem;">${i18n(
            10 /* Back */
          )}</button>
        </div>
    `;

  modalContent.innerHTML = html;

  // AUTHENTICATE EXISTING PASSKEY
  if (isWebAuthnAvailable) {
    document
      .getElementById("authentication-button")
      .addEventListener("click", async function () {
        if (OPALE_PASSKEY_FORMAT == "popup") {
          authPopup("authenticate", sessionUUID, null);
        } else {
          authRedirect("authenticate", sessionUUID, null);
        }
      });
  }

  // add event listener to .pick-button elements
  document.querySelectorAll(".verification-option").forEach((button) => {
    button.addEventListener("click", function () {
      pickIdentityProvider(
        identityProviders.find(
          (identityProvider) =>
            identityProvider.name === button.id.replace("-button", "")
        )
      );
    });
  });

  // add event listener to back button
  document.getElementById("back-button").addEventListener("click", function () {
    showVerificationOptions(identityProviders);
  });

  // Event listener for authentice popup
  if (OPALE_PASSKEY_FORMAT == "popup") {
    window.addEventListener("message", async (event) => {
      if (event.origin !== env.authenticatorURL) return;
      const data = event.data;
      if (data.mode === "authenticate") {
        const response = await fetch(
          `${env.apiUrl}/finish-verification/passkey/${sessionUUID}?key=${OPALE_WEBSITE_ID}&passkey=${data.outcome}`
        );
        const responseData = await response.json();
        window.location.href = responseData.redirectUrl;
      }
    });
  }

  // Event listener for messages from verification iframe
  window.addEventListener("message", async (event) => {
    const data = event.data;
    if (data && data.newIframeSrc) {
      // Start verification
      var iframe = document.getElementById("verification-iframe");
      iframe.src = data.newIframeSrc;
    } else if (data && data.hasCompleted && data.identityProvider) {
      // Finish iFrame verification
      var iframe = document.getElementById("verification-iframe");
      iframe.src = `${env.apiUrl}/finish-verification/${data.identityProvider}/${sessionUUID}?key=${OPALE_WEBSITE_ID}&session_id=${data.sessionId}`;
    } else if (data && data.newUrl && data.identityProviderId) {
      // Redirect user based on verification outcome
      if (data.newUrl.includes("&result=ok&") && isWebAuthnAvailable) {
        // Successful verification page
        displayVerificationSuccessPage(
          data.newUrl,
          sessionUUID,
          data.identityProviderId
        );
      } else {
        window.location.href = data.newUrl;
      }
    } else if (data && data.hasError) {
      console.log("Error: " + data.error);
    }
  });

  // BACK BUTTON ONLY EXISTS IN MODAL FORMAT
  if (OPALE_FORMAT == "modal") {
    document
      .getElementById("back-button-openmodal")
      .addEventListener("click", function () {
        // reset opale-clicked-over-18 to false
        sessionStorage.setItem("opale-clicked-over-18", "false");
        // delete "opale-modal-container" element
        var modalContainer = document.getElementById("opale-modal-container");
        // empty modalContainer
        modalContainer.innerHTML = "";
        // create and display the modal
        createModal();
        openModal();
      });
  }
  openModal();
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
