import { i18n } from "../language/i18n";
import { authPopup } from "../modal/api";

export function displayVerificationSuccessPage(
  newUrl,
  sessionUUID,
  identityProviderId
) {
  const modalContainer = document.getElementById("opale-modal-content");
  // This replaces all existing content of modalContainer with the new HTML
  modalContainer.innerHTML = `
    <div>
        <img src="${OPALE_LOGO}" id="opale-logo">
        <p>${i18n(15)}</p>
        <div class="progress-buttons-container" style="grid-template-columns: 1fr 1fr;">
        <button id="continue-to-site" class="button back-button">${i18n(
          16
        )}</button>
        <button id="register-passkey" class="progress-button"> ${i18n(17)}
          <span class="tooltip">${i18n(18)}</span>
        </button>
        </div>
        
    </div>`;
  document.getElementById("continue-to-site").addEventListener("click", () => {
    window.location.href = newUrl;
  });
  document.getElementById("register-passkey").addEventListener("click", () => {
    authPopup("register", sessionUUID, identityProviderId);
    window.location.href = newUrl;
  });
}
