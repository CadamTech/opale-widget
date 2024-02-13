import { i18n } from "../language/i18n";
import { authPopup } from "../modal/api";

export function displayVerificationSuccessPage(newUrl, sessionUUID) {
  const modalContainer = document.getElementById("opale-modal-content");
  // This replaces all existing content of modalContainer with the new HTML
  modalContainer.innerHTML = `
    <div>
        <img src="${OPALE_LOGO}" id="opale-logo">
        <p>${i18n(15)}</p>
        <div class="progress-buttons-container">
        <button id="continue-to-site" class="progress-button" style="padding: 0;">${i18n(
          16
        )}</button>
        <button type="checkbox" id="register-passkey" class="progress-button" style="padding: 0;"> ${i18n(
          17
        )}</button>
        </div>
        
    </div>`;
  document
    .getElementById("register-passkey")
    .addEventListener("click", () => {
      authPopup("register", sessionUUID);
      window.location.href = newUrl;
    });
  document
    .getElementById("continue-to-site")
    .addEventListener("click", function () {
      authPopup("register", sessionUUID);
      window.location.href = newUrl;
    });
}