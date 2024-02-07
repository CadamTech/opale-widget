
export function completeSuccessfulVerification(newUrl) {
  document.getElementById("opale-modal-content").style.display = "none";
  const modalContainer = document.getElementById("opale-modal-container");
  // This replaces all existing content of modalContainer with the new HTML
  modalContainer.innerHTML = `
    <div id="successful-verification-page" style="display: flex; flex-direction: column; align-items: center; align-self: center; width: 100%;">
        <img src="${OPALE_LOGO}" id="opale-logo">
        <p>You have been successfully verified</p>
        <button id="continue-to-site">continue to site</button>
        <label id="register-checkbox">create anonymous passkey and skip verification <input type="checkbox"/></label>
    </div>`;

  // Now that the content has been replaced and exists in the DOM, add the event listener
  document
    .getElementById("continue-to-site")
    .addEventListener("click", function () {
      window.location.href = newUrl;
    });
}
