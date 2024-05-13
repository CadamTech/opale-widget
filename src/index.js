import { isOver18, setIsOver18, getSessionUUID } from "./session/session.js";
import { createModal, openModal, closeModal } from "./modal/modal.js";
import { getSDKServiceProvider } from "./modal/api.js";

(function () {
  async function launchOpale() {
    // Check session storage for api key

    console.log("opale_api_key from window", window.OPALE_WEBSITE_ID);
    if (!OPALE_WEBSITE_ID) {
      window.OPALE_WEBSITE_ID = sessionStorage.getItem("opale_api_key");
      console.log(
        "opale_api_key from session storage",
        window.OPALE_WEBSITE_ID
      );
      if (!window.OPALE_WEBSITE_ID) {
        console.log("Missing API key");
        return;
      }
    } else {
      // Set session storage if the key is found in window.OPALE_WEBSITE_ID and not already in session storage
      console.log("api key set to session storage");
      sessionStorage.setItem("opale_api_key", window.OPALE_WEBSITE_ID);
    }
    console.log("opale_api_key", window.OPALE_WEBSITE_ID);

    // Find or create UUID
    window.OPALE_USER_ID = window.OPALE_USER_ID || (await getSessionUUID());
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

    // If param has ?over18=true, set the cookie
    var over18CheckPassed = false;
    if (window.location.search.includes("opaleverif=")) {
      // get value of opaleverif param
      const urlParams = new URLSearchParams(window.location.search);
      const over18Param = urlParams.get("opaleverif");
      if (await nature(over18Param)) {
        setIsOver18(over18Param);
        over18CheckPassed = true;
        // Remove opaleverif param from url
        window.history.replaceState(
          {},
          document.title,
          "/" +
            window.location.href
              .split("/")
              .pop()
              .replace("?opaleverif=" + over18Param, "")
        );
      }
    }

    if (!isOver18() && !over18CheckPassed) {
      var modalContainer = document.createElement("div");
      modalContainer.id = "opale-modal-container";
      document.body.appendChild(modalContainer);
      createModal();
      openModal();
    } else {
      console.log("Opale: session valid");
      closeModal();
    }
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
