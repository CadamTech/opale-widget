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
    <div style="display: flex; flex-direction: column; align-items: center;">
        <img src="${OPALE_LOGO}" id="opale-logo">
        <p>${i18n(15)}</p>
        <div class="progress-buttons-container" style="grid-template-columns: 1fr 1fr;">
        <button id="continue-to-site" class="button progress-button">${i18n(
          16
        )}</button>
        <button id="register-passkey" class="progress-button"> ${i18n(17)}
        </button>
        </div>
        <p style="width: 80%; font-size: x-small; margin-top: 1rem;">${i18n(18)}</p>
    </div>`;
  document.getElementById("continue-to-site").addEventListener("click", () => {
    window.location.href = newUrl;
  });
  document.getElementById("register-passkey").addEventListener("click", () => {
    authPopup("register", sessionUUID, identityProviderId);
    window.location.href = newUrl;
  });
}
