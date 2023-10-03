import { getIdentityProviders, pickIdentityProvider } from './api';

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

  .button { 
    border-radius: 50px  !important;
  }

  .button-pink {
    background-color: #d0006f !important;
    border-color: #d0006f  !important;
  }

  .button-white {
    color: #ffffff !important;
    border-color: #ffffff  !important;
  }

  #opale-modal-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  #opale-modal-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* 80% darker with transparency */
    backdrop-filter: blur(5px); /* Apply background blur effect */
    z-index: -1; /* Place it behind the modal content */
  }

    #modal-content {
        background-color: #000000;
        color: #dddddd;
        width: 80%;
        max-width: 600px;
        padding: 20px;
        border-radius: 5px;
        min-height: 600px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        font-family: sans-serif; /* Use sans-serif font */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* Default styles for larger screens (e.g., computers) */
    .verification-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
    }

    .verification-options-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    
    /* Styles for mobile devices (screen width less than 768px) */
    @media screen and (max-width: 767px) {
        .verification-options {
            grid-template-columns: 1fr; /* Display as a single column */
        }
        .verification-option {
          margin-top: 10%;
        }
        #modal-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: around;
        }
    }
    

    .verification-option {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .verification-option img {
        max-width: 250px; /* Adjust the image size as needed */
        height: 60px; /* Adjust the image size as needed */
        margin-bottom: 10px;
    }

    #verification-iframe {
      display: none;
    }


    iframe {
      width: 100%;
      height: 80%;
      min-height: 400px;
      border: none;
      border-radius: 15px;
    }

    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #FFF;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      }
  
      @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
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
        <img src="https://ga.dorcel.com/resources/d-header-logo-vision-strait/1638278048.png" alt="Dorcel Logo">
        <h2>Are You Over 18?</h2>
        <div>
          <button id="over-18-button" class="button button-pink">I'm Over 18</button>
          <a href="https://google.com" id="not-over-18-button" class="button button-outline button-white">Exit</a>
        </div>
    `;

    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // // Create a link element for the CSS file
    // var cssLink = document.createElement("link");
    // cssLink.rel = "stylesheet";
    // cssLink.href = "path/to/your/modal.css"; // Adjust the path to your CSS file
    // document.head.appendChild(cssLink);

    // Ajouter un écouteur d'événements au bouton "I'm Over 18"
    var over18Button = document.getElementById("over-18-button");
    over18Button.addEventListener("click", function() {
        showVerificationOptions();
    });

    // Warm identity providers
    getIdentityProviders();
}

// Fonction pour afficher les options de vérification
export async function showVerificationOptions() {

    const identityProviders = await getIdentityProviders();

    console.log('IDENTITY PROVIDERS FROM MODAL.JS');
    console.log(identityProviders);

    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <h2>Vérification de l'âge nécessaire</h2>
        <div class="verification-options-container">
          <div class="verification-options-content">
            <h6>Choisissez l'une des options suivantes pour vérifier votre âge.</h6>
            <div class="verification-options">
                ${identityProviders.map(identityProvider => `
                    <div class="verification-option ">
                        <img src="${identityProvider.logo}" alt="${identityProvider.name}">
                        <a id="${identityProvider.name}-button" class="button pick-provider-button">${identityProvider.description}</a>
                    </div>
                `).join('')}
            </div>
            <small>Les vérifications sont anonymes sécurisées et anonymisées par Opale</small>
          </div>
          <span class="loader" style="display:none"></span>
        </div>
        <iframe id="verification-iframe" allow="camera;microphone" width="100%" height="300px"></iframe>
    `;

    // add evenet listener to .pick-button elements
    document.querySelectorAll('.pick-provider-button').forEach(button => {
        button.addEventListener('click', function() {
            pickIdentityProvider(identityProviders.find(identityProvider => identityProvider.name === button.id.replace('-button', '')));
        });
    });

    // var idVerificationButton = document.getElementById("id-verification-button");
    // idVerificationButton.addEventListener("click", function() {
    //     // Handle ID verification logic here
    //     alert("ID Verification Placeholder");
    // });

    // var franceConnectButton = document.getElementById("france-connect-button");
    // franceConnectButton.addEventListener("click", function() {
    //     // Handle France Connect logic here
    //     alert("France Connect Placeholder");
    // });

    // var creditCardVerificationButton = document.getElementById("credit-card-verification-button");
    // creditCardVerificationButton.addEventListener("click", function() {
    //     // Handle credit card verification logic here
    //     alert("Credit Card Verification Placeholder");
    // });

    openModal();
}

// Fonction pour ouvrir le modal
export function openModal() {
    var modal = document.getElementById("opale-modal-container");
    modal.style.display = "flex"; // Use flex to center the modal
}

// Fonction pour fermer le modal
export function closeModal() {
    var modal = document.getElementById("opale-modal-container");
    modal.style.display = "none";
}