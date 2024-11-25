import { logIsOver18, authRedirect } from "./api.js";
import { i18n } from "../language/i18n.js";

// Fonction pour créer et afficher le modal
export async function createModal() {
    // Create a <style> element and append the CSS rules to it
    var styleElement = document.createElement("style");
    let accumulatedStyles = "";
    const applyStyles = (module) => {
        accumulatedStyles += module;
        styleElement.textContent = accumulatedStyles;
    };

    // Conditional style loading
    if (window.OPALE_THEME == "dark") {
        import("../styles/content-dark.js")
            .then((module) => applyStyles(module.style))
            .catch((error) => console.error("Failed to load dark theme styles", error));
    } else {
        import("../styles/content-light.js")
            .then((module) => applyStyles(module.style))
            .catch((error) => console.error("Failed to load light theme styles", error));
    }
    import("../styles/structure.js")
        .then((module) => applyStyles(module.style))
        .catch((error) => console.error("Failed to load structure styles", error));

    var modalContainer = document.getElementById("opale-modal-container");
    var modalContent = document.createElement("div");
    modalContent.id = "opale-modal-content";
    modalContent.style.transform = "scale(0)";

    if (window.OPALE_FORMAT == "modal") {
        import("../styles/modal.js")
            .then((module) => applyStyles(module.style))
            .catch((error) => console.error("Failed to load modal styles", error));
    }

    document.head.appendChild(styleElement);

    modalContent.innerHTML = `
          <img src="${OPALE_LOGO}" id="opale-logo">
          <h2 id="over-18-title">${i18n(2) /* This site is accessible only to persons aged 18 and over */}</h2>
          <div class="buttons-container">
            
            <button id="agekey-button">
                <svg width="30" height="30" viewBox="0 0 256 272" fill="green" xmlns="http://www.w3.org/2000/svg" id="agekey-icon">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M83 101C110.614 101 131 81.5 131.5 50C132 18.5 111.5 0 83 0C53 0 34.5 22.3858 34.5 50C34.5 82 55.3858 101 83 101ZM36 111C16.1178 111 0 127.118 0 147V152.134V156V192C0 203.046 8.9543 212 20 212H108L161 212.5V182.195C161.006 180.356 161.004 178.405 161.002 176.337C161.001 175.257 161 174.145 161 173V172H159.664C143.246 159.493 129.461 140.724 128 112V111H92H85H36ZM256 109.5C256 132.142 242.441 152.982 223 162.327V169.941L231.001 185.001L223 195.824V221.5L231.004 231.498L200.504 271.998L179.004 249.999L179 250V162.795C159.025 153.692 145 132.529 145 109.5C145 78.8482 169.848 54 200.5 54C231.152 54 256 78.8482 256 109.5ZM201 122C209.284 122 216 115.284 216 107C216 98.7157 209.284 92 201 92C192.716 92 186 98.7157 186 107C186 115.284 192.716 122 201 122Z"
                    fill="white"/>
                </svg>
                <span id="agekey-text">AgeKey</span>
                <span id="loader-agekey" class="loader"></span>
            </button>

            <button id="over-18-button" class="verification-button">
            <span id="over-18-text">${i18n(3 /* I am 18 years old or older */)}</span>
            <span id="loader" class="loader"></span>
            </button>

            <a href="${OPALE_CANCEL_URL}" id="not-over-18-button" class="back-button">${i18n(4 /* Exit */)}</a>

      
          </div>
          
            <div id="poweredByOpale">
              <span>Powered by</span>
              
              <img id="opaleLogo" src=${
                  OPALE_THEME === "dark"
                      ? "https://public-assets.opale.io/logo/opale-logo-no-bg-dark.png"
                      : "https://public-assets.opale.io/logo/opale-logo-no-bg.png"
              } alt="Opale.io">
            </div>`;

    modalContainer.appendChild(modalContent);

    // "I'm Over 18" button
    const ageKeyButton = document.getElementById("agekey-button");
    const ageKeyIcon = document.getElementById("agekey-icon");
    const ageKeyText = document.getElementById("agekey-text");
    const loaderAgekey = document.getElementById("loader-agekey");

    const over18Button = document.getElementById("over-18-button");
    const over18text = document.getElementById("over-18-text");
    const loader = document.getElementById("loader");
    const poweredByOpale = document.getElementById("poweredByOpale");

    // EVENT LISTENER FOR CLICK ON OVER 18 BUTTON
    over18Button.addEventListener("click", function () {
        // Replace button content by a loader
        over18text.style.display = "none";
        loader.style.display = "block";
        logIsOver18().then(() => {
            over18text.style.display = "block";
            loader.style.display = "none";
        });
        authRedirect();
    });

    ageKeyButton.addEventListener("click", function () {
        ageKeyText.style.display = "none";
        ageKeyIcon.style.display = "none";
        loaderAgekey.style.display = "block";

        logIsOver18().then(() => {
            ageKeyText.style.display = "block";
            ageKeyIcon.style.display = "block";
            loaderAgekey.style.display = "none";
        });
        authRedirect(true);
    });

    setTimeout(() => {
        modalContent.style.transform = "scale(1)";
    }, 100);

    poweredByOpale.addEventListener("click", function () {
        window.open("https://opale.io/", "_blank");
    });
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
