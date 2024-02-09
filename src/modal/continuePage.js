import { i18n } from "../language/i18n";
import { authPopup } from "./api";

export function displayVerificationSuccessPage(newUrl, sessionUUID) {
  const modalContainer = document.getElementById("opale-modal-content");
  // This replaces all existing content of modalContainer with the new HTML
  modalContainer.innerHTML = `
    <div id="successful-verification-page" style="display: flex; flex-direction: column; align-items: center; align-self: center; width: 100%;">
        <img src="${OPALE_LOGO}" id="opale-logo">
        <p>${i18n(16)}</p>
        <button id="continue-to-site">${i18n(17)}</button>
        <label style="padding: 0 1rem 0 1rem; font-weight: 400; margin-top: 1rem;">${i18n(
          15
        )}<input type="checkbox" id="register-checkbox"/></label>
    </div>`;
  let registerCheckbox = false;
  document
    .getElementById("register-checkbox")
    .addEventListener("click", (event) => {
      registerCheckbox = event.target.checked;
    });
  // Now that the content has been replaced and exists in the DOM, add the event listener
  document
    .getElementById("continue-to-site")
    .addEventListener("click", function () {
      if (registerCheckbox) {
        authPopup("register", sessionUUID);
      } 
      window.location.href = newUrl;
    });
}
