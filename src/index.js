import { generateSessionUUID } from "./session/session.js";
import { createModal, openModal } from "./modal/modal.js";
import { getSDKServiceProvider } from "./modal/api.js";

(function () {
  async function launchOpale() {
    // Check session storage for api key
    if (!OPALE_WEBSITE_ID) {
      window.OPALE_WEBSITE_ID = sessionStorage.getItem("opale_api_key");
      if (!window.OPALE_WEBSITE_ID) {
        console.log("Missing API key");
        return;
      }
    } else {
      // Set session storage if the key is found in window.OPALE_WEBSITE_ID and not already in session storage
      sessionStorage.setItem("opale_api_key", window.OPALE_WEBSITE_ID);
    }

    // Find or create UUID
    window.OPALE_USER_ID = window.OPALE_USER_ID || generateSessionUUID();
    const sdk = await getSDKServiceProvider(OPALE_USER_ID);

    // Set default SDK configurations
    window.OPALE_PRIMARY_COLOR = sdk.primaryColor || "#D1016E";
    window.OPALE_THEME = sdk.theme || "light";
    window.OPALE_FORMAT = sdk.format || "modal";
    window.OPALE_LANGUAGE = sdk.language || "fr";
    window.OPALE_LOGO =
      sdk.splash ||
      "https://opale.io/wp-content/uploads/2023/10/Logo-Opale-fond-blanc-petit-format-retina-site.png";
    window.OPALE_PASSKEY_PAGE = sdk.passkeyPage ?? true;
    window.OPALE_CANCEL_URL = sdk.cancelUrl || "https://google.com";

    var modalContainer = document.createElement("div");
    modalContainer.id = "opale-modal-container";
    document.body.appendChild(modalContainer);
    createModal();
    openModal();
  }

  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    launchOpale();
  } else {
    window.addEventListener("load", launchOpale);
  }
})();
