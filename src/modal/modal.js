import {
  getIdentityProviders,
  pickIdentityProvider,
  authPopup,
  logIsOver18,
} from "./api.js";
import { displayVerificationSuccessPage } from "./handlers.js";
import { modalStyles } from "../styles/modal.js";
import { modalContentDarkStyles } from "../styles/content-dark.js";
import { modalContentLightStyles } from "../styles/content-light.js";
import { modalContentStructure } from "../styles/structure.js";
import { getSessionUUID, generateSessionUUID } from "../session/session.js";
import { i18n } from "../language/i18n.js";
import { env } from "../env.js";

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
    modalContent.innerHTML = "";
    modalContent.innerHTML += `<img src="${OPALE_LOGO}" id="opale-logo">`;
    modalContent.innerHTML += `
          <h4 style="margin:10%">${
            i18n(
              2
            ) /* This site is accessible only to persons aged 18 and over */
          }</h4>
          <div>
            <button id="over-18-button" class="button button-verification" style="width:100%;margin-bottom:5%">${i18n(
              3 /* I am 18 years old or older */
            )}</button>
            <a href="https://google.com" id="not-over-18-button" class="button button-outline">${i18n(
              4 /* Exit */
            )}</a>
          </div>
      `;
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
          <div class="verification-options-content">`;

  if (typeof OPALE_LOGO !== "undefined")
    html += `<img src="${OPALE_LOGO}" id="opale-logo">`;

  html += `<h5 style="margin: 0;">${failureMessage}${
    i18n(6) /* Choose one of the following options to verify your age. */
  }</h5>
            <a id="authentication-button" style="cursor: pointer;">Opale.io passkey</a>
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
              <p>
                <small>${i18n(
                  7 /* Verifications are secure and anonymized by */
                )} <a href="https://opale.io" target="_blank"> Opale.io </a><br>${i18n(
    8 /* By using this service, you agree to our */
  )} <a href="https://opale.io/fr/politique-de-confidentialite/" target="_blank">${i18n(
    9 /* Privacy Policy */
  )}</a></small>
            </p>
            `;

  if (OPALE_FORMAT == "modal")
    html += `<button id="back-button-openmodal" class="button button-outline">${i18n(
      10 /* Back */
    )}</button>`;

  html += `
          </div>
          </div>
        <div id="verification-iframe-container" style="display:none">
        <div class="loader-container" style="display:none !important;justify-content:center !important;align-items:center !important;padding: 30%">
            <span class="loader"></span>
          </div>
          <iframe id="verification-iframe" allow="camera" width="100%" height="300px"></iframe>
          <button id="back-button" class="button button-outline" style="margin-top: 1rem;">${i18n(
            10 /* Back */
          )}</button>
        </div>
    `;

  modalContent.innerHTML = html;

  // AUTHENTICATE EXISTING PASSKEY
  document
    .getElementById("authentication-button")
    .addEventListener("click", async function () {
      await authPopup("authenticate", sessionUUID);
    });

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
  window.addEventListener("message", async (event) => {
    if (event.origin !== env.authenticatorURL) return;
    const data = event.data;
    if (data.mode === "authenticate") {
      const response = await fetch(
        `${env.apiUrl}/finish-verification/passkey/${sessionUUID}?key=${OPALE_WEBSITE_ID}&passkey=${data.outcome}`
      );
      const responseData = await response.json();
      if (response.status === 200) {
        window.location.href = responseData.redirectUrl;
      }
    }
  });

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
    } else if (data && data.newUrl) {
      // Redirect user based on verification outcome
      if (data.newUrl.includes("&result=ok&")) {
        // Successful verification page
        displayVerificationSuccessPage(data.newUrl, sessionUUID);
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
