import { generateSessionUUID } from "./session/session.js";
import { createModal, openModal } from "./modal/modal.js";
import { getServiceProviderConfig } from "./modal/api.js";

(function () {
    async function launchOpale() {
        if (!window.OPALE_WEBSITE_ID) {
            console.log("Missing API key");
            return;
        }
        // const sessionStorageApiKey = sessionStorage.getItem("opale_api_key");
        // if (sessionStorageApiKey) {
        //   window.OPALE_WEBSITE_ID = sessionStorageApiKey;
        // } else {
        //   // abTestProfiles();
        //   sessionStorage.setItem("opale_api_key", window.OPALE_WEBSITE_ID);
        // }
        // // Check session storage for api key
        // if (!window.OPALE_WEBSITE_ID) {
        //   console.log("Missing API key");
        //   return;
        // }

        // Find or create UUID
        window.OPALE_USER_ID = window.OPALE_USER_ID || generateSessionUUID();
        const config = await getServiceProviderConfig();

        // Set default config configurations
        window.OPALE_PRIMARY_COLOR = config.primaryColor || "#D1016E";
        window.OPALE_THEME = config.theme || "light";
        window.OPALE_FORMAT = config.format || "modal";
        window.OPALE_LANGUAGE = config.language || "fr";
        window.OPALE_LOGO = config.splash || "https://public-assets.opale.io/logo/opale-simply-safe-no-bg.png";
        window.OPALE_PASSKEY_PAGE = config.passkeyPage ?? true;
        window.OPALE_CANCEL_URL = config.cancelUrl || "https://google.com";

        if (window.OPALE_FORMAT == "modal") {
            const modalContainer = document.createElement("div");
            modalContainer.id = "opale-modal-container";
            document.body.appendChild(modalContainer);
        }

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
