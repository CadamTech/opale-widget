// Fonction pour vérifier si un cookie existe
function getCookie(cookieName) {
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

// Add CSS styles for the modal (inline styles)
var modalStyles = `
  #modal-container {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      display: flex;
  }

  #modal-content {
      background-color: #fff;
      width: 80%;
      max-width: 400px;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
  }

  h2 {
      font-size: 24px;
      margin-bottom: 10px;
  }

  p {
      font-size: 16px;
      margin-bottom: 20px;
  }

  button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-right: 10px;
  }
`;

// Create a <style> element and append the CSS rules to it
var styleElement = document.createElement("style");
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

// Fonction pour créer et afficher le modal
function createModal() {
  var modalContainer = document.createElement("div");
  modalContainer.id = "modal-container";

  var modalContent = document.createElement("div");
  modalContent.id = "modal-content";
  modalContent.innerHTML = `
      <h2>PROHIBITED TO PERSONS UNDER 18 YEARS OLD</h2>
      <p>Contenu du modal</p>
      <button id="modal-ok-button">I'm over 18</button>
      <button id="modal-close-button">Close</button>
  `;

  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  // Ajouter un écouteur d'événements au bouton OK
  var modalOkButton = document.getElementById("modal-ok-button");
  modalOkButton.addEventListener("click", function() {
      // Définir un cookie pour se rappeler que le modal a été affiché
      document.cookie = "modalDisplayed=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      closeModal();
  });

  // Ajouter un écouteur d'événements au bouton Fermer
  var modalCloseButton = document.getElementById("modal-close-button");
  modalCloseButton.addEventListener("click", function() {
      closeModal();
      // Rediriger vers google.com
      window.location.href = "https://www.google.com";
  });
}

// Fonction pour ouvrir le modal
function openModal() {
  var modal = document.getElementById("modal-container");
  modal.style.display = "flex"; // Use flex to center the modal
}

// Fonction pour fermer le modal
function closeModal() {
  var modal = document.getElementById("modal-container");
  modal.style.display = "none";
}

// Vérifier si le cookie existe, sinon créer et afficher le modal
window.onload = function () {
  if (!getCookie("modalDisplayed")) {
      createModal();
      openModal();
  }
};
