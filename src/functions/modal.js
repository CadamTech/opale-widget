import {
  getIdentityProviders,
  pickIdentityProvider,
  registerWebAuth,
  verifyWebAuth,
} from "./api";
import { modalStyles } from "../styles/modal";
import { modalContentDarkStyles } from "../styles/content-dark";
import { modalContentLightStyles } from "../styles/content-light";
import { modalContentStructure } from "../styles/structure.js";
import { getSessionUUID } from "./session.js";
import { generateSessionUUID } from "./session.js";
import { i18n } from "./i18n.js";
import { env } from "../env.js";
import { startRegistration } from "@simplewebauthn/browser";
// Add CSS styles for the modal

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

    if (typeof OPALE_LOGO !== "undefined")
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

      // Log to /log/ if the user is over 18
      fetch(env.apiUrl + "/log/" + sessionUUID + "?key=" + OPALE_WEBSITE_ID, {
        method: "POST",
        body: JSON.stringify({
          log_type: "is_over_18",
          value: "",
        }),
        redirect: "follow",
      }).catch((error) => console.log("error", error));

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

  html += `<h5>${failureMessage}${
    i18n(6) /* Choose one of the following options to verify your age. */
  }</h5>

            <form style="display: flex; justify-content: space-between; align-items: center; font-weight: 100; margin: 0;">
            <p style="margin: 0;">already have a passkey ?</p>
            <input type="text" style="width: 15rem; margin: 0;" placeholder="click to autofill token">
            <button style="width: 10rem; padding: 0; font-size: .8rem; margin: 0;">authenticate</button>
            </form>

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
            <form >
               <label style="font-weight: 100; margin: 0;">create anonymous passkey for next visit
                  <input type="checkbox" id="webauthnCheckbox"/>
              </label>
            </form>
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

  document
    .getElementById("webauthnCheckbox")
    .addEventListener("change", async function () {
      const sessionUUID = await getSessionUUID();
      if (this.checked) {
        try {
          // Create registration options
          const opts = await registerWebAuth(
            sessionUUID,
            window.location.hostname
          );
          console.log(opts)
          // Send options and receive attestation
          const parsedOpts = JSON.parse(opts);
          const attResp = await startRegistration(parsedOpts);
          console.log(attResp)
          // Verify registration completion and receive registrationVerification
          const registrationVerification = await verifyWebAuth(
            sessionUUID,
            attResp
          );
          console.log(registrationVerification);
        } catch (error) {
          console.log(error)
        }
      
      } else {
        console.log("checkbox unticked")
      }
    });

  // add evenet listener to .pick-button elements
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

  // add event listener for messages from iframe
  window.addEventListener("message", (event) => {
    const data = event.data;

    if (data && data.newIframeSrc) {
      var iframe = document.getElementById("verification-iframe");
      iframe.src = data.newIframeSrc;
    } else if (data && data.newUrl) {
      window.location.href = data.newUrl;
    } else if (data && data.hasCompleted && data.identityProvider) {
      var iframe = document.getElementById("verification-iframe");
      iframe.src =
        env.apiUrl +
        "/finish-verification/" +
        data.identityProvider +
        "/" +
        sessionUUID +
        "?key=" +
        OPALE_WEBSITE_ID +
        "&session_id=" +
        data.sessionId;
    } else if (data && data.hasError) {
      console.log("Trustmatic error: " + data.error);
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

// Fonction pour ouvrir le modal
export function openModal() {
  var modal = document.getElementById("opale-modal-container");
  modal.style.display = "flex"; // Use flex to center the modal
}

// Fonction pour fermer le modal
export function closeModal() {
  var modal = document.getElementById("opale-modal-container");
  modal.style.display = "none";
}
