// Fonction pour vérifier si un cookie existe
export function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
          return true;
      }
  }
  return false;
}

// Add CSS styles for the modal
var modalStyles = `
    #opale-modal-container {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px); /* Apply background blur effect */
        z-index: 1000;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    #modal-content {
        background-color: rgba(255, 255, 255, 0.9); /* Add a semi-transparent white background */
        width: 80%;
        max-width: 400px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        font-family: sans-serif; /* Use sans-serif font */
    }

    .verification-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        justify-items: center;
        align-items: center;
    }

    .verification-option {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .verification-option img {
        width: 100px; /* Adjust the image size as needed */
        height: 100px; /* Adjust the image size as needed */
        margin-bottom: 10px;
    }

    .verification-option button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
`;

// Create a <style> element and append the CSS rules to it
var styleElement = document.createElement("style");
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

// Fonction pour créer et afficher le modal
export function createModal() {
    var modalContainer = document.createElement("div");
    modalContainer.id = "opale-modal-container";

    var modalContent = document.createElement("div");
    modalContent.id = "modal-content";
    modalContent.innerHTML = `
        <h2>Are You Over 18 ?</h2>
        <button id="over-18-button">I'm Over 18</button>
        <button id="not-over-18-button">Exit</button>
    `;

    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Create a link element for the CSS file
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "path/to/your/modal.css"; // Adjust the path to your CSS file
    document.head.appendChild(cssLink);

    // Ajouter un écouteur d'événements au bouton "I'm Over 18"
    var over18Button = document.getElementById("over-18-button");
    over18Button.addEventListener("click", function() {
        closeModal();
        showVerificationOptions();
    });
}

// Fonction pour afficher les options de vérification
export function showVerificationOptions() {
    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <h2>Verification Options</h2>
        <div class="verification-options">
            <div class="verification-option">
                <img src="placeholder_image_1.jpg" alt="Face age verification">
                <button id="face-verification-button">Face Age Verification</button>
            </div>
            <div class="verification-option">
                <img src="placeholder_image_2.jpg" alt="ID verification">
                <button id="id-verification-button">ID Verification</button>
            </div>
            <div class="verification-option">
                <img src="placeholder_image_3.jpg" alt="France Connect">
                <button id="france-connect-button">France Connect</button>
            </div>
            <div class="verification-option">
                <img src="placeholder_image_4.jpg" alt="Credit card verification">
                <button id="credit-card-verification-button">Credit Card Verification</button>
            </div>
        </div>
    `;

    // Ajouter un écouteur d'événements aux boutons de vérification
    var faceVerificationButton = document.getElementById("face-verification-button");
    faceVerificationButton.addEventListener("click", function() {
        // Handle face age verification logic here
        alert("Face Age Verification Placeholder");
    });

    var idVerificationButton = document.getElementById("id-verification-button");
    idVerificationButton.addEventListener("click", function() {
        // Handle ID verification logic here
        alert("ID Verification Placeholder");
    });

    var franceConnectButton = document.getElementById("france-connect-button");
    franceConnectButton.addEventListener("click", function() {
        // Handle France Connect logic here
        alert("France Connect Placeholder");
    });

    var creditCardVerificationButton = document.getElementById("credit-card-verification-button");
    creditCardVerificationButton.addEventListener("click", function() {
        // Handle credit card verification logic here
        alert("Credit Card Verification Placeholder");
    });

    openModal();
}

// Fonction pour ouvrir le modal
export function openModal() {
    var modal = document.getElementById("modal-container");
    modal.style.display = "flex"; // Use flex to center the modal
}

// Fonction pour fermer le modal
export function closeModal() {
    var modal = document.getElementById("modal-container");
    modal.style.display = "none";
}