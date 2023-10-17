import { getIdentityProviders, pickIdentityProvider } from './api';
import { modalStyles } from '../styles/modal';
import { getSessionUUID } from './session.js';
// Add CSS styles for the modal


// Create a <style> element and append the CSS rules to it
var styleElement = document.createElement("style");
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

async function waitForIdentityProviders(sessionUUID) {
  const identityProviders = await getIdentityProviders(sessionUUID);
  showVerificationOptions(identityProviders);
}


// Fonction pour créer et afficher le modal
export async function createModal() {

    var modalContainer = document.getElementById("opale-modal-container");

    var modalContent = document.createElement("div");
    modalContent.id = "opale-modal-content";
    modalContent.innerHTML = `
        <img src="https://ga.dorcel.com/resources/d-header-logo-vision-strait/1638278048.png" alt="Dorcel Logo">
        <h4 style="margin:10%">Ce site est accessible uniquement aux personnes âgées de 18 ans et plus</h4>
        <div>
          <button id="over-18-button" class="button button-pink" style="width:100%;margin-bottom:5%">J'ai 18 ans ou plus</button>
          <a href="https://google.com" id="not-over-18-button" class="button button-outline button-white">Sortir</a>
        </div>
    `;

    modalContainer.appendChild(modalContent);

    // // Create a link element for the CSS file
    // var cssLink = document.createElement("link");
    // cssLink.rel = "stylesheet";
    // cssLink.href = "path/to/your/modal.css"; // Adjust the path to your CSS file
    // document.head.appendChild(cssLink);

    // Ajouter un écouteur d'événements au bouton "I'm Over 18"
    var over18Button = document.getElementById("over-18-button");

    // Warm identity providers
    const sessionUUID = await getSessionUUID();

    // CLICK ON OVER 18 BUTTON
    over18Button.addEventListener("click", function() {

      // Replace button content by a loader
      over18Button.innerHTML = '<span class="loader"></span>';

      // Log to https://verifier.opale.io/log/ if the user is over 18
      fetch("https://verifier.opale.io/log/"+sessionUUID+"?key="+OPALE_WEBSITE_ID,
      { 
          method: 'POST',
          body: JSON.stringify({
            "log_type": "is_over_18",
            "value": ""
          }),
          redirect: 'follow'
      })
      .catch(error => console.log('error', error));
      
      waitForIdentityProviders(sessionUUID);
      
    });

    // BEFORE UNLOAD : MONITOR DROP
    window.addEventListener('beforeunload', function () {
      // Generate and store a new sessionUID before the tab is closed
      localStorage.setItem('sessionUID', generateSessionUID());
    });
}

// Fonction pour afficher les options de vérification
export async function showVerificationOptions(identityProviders) {


    var modalContent = document.getElementById("opale-modal-content");
    modalContent.innerHTML = `
        <div class="verification-options-container">
          <div class="verification-options-content">
          <img src="https://ga.dorcel.com/resources/d-header-logo-vision-strait/1638278048.png" alt="Dorcel Logo">
            <h5>Choisissez l'une des options suivantes pour vérifier votre âge</h5>
            <div class="verification-options">
                ${identityProviders.map(identityProvider => `
                    <div class="verification-option" id="${identityProvider.name}-button">
                        <img src="${identityProvider.logo}" alt="${identityProvider.name}">
                        <a class="button button-pink">${identityProvider.description}</a>
                    </div>
                `).join('')}
            </div>
            <p>
              <small>Les vérifications sont sécurisées et anonymisées par <a href="https://opale.io" target="_blank">Opale.io</a></small>
            </p>
            <button id="back-button-openmodal" class="button button-outline button-white">Retour</button>
          </div>
        </div>
        <div id="verification-iframe-container" style="display:none">
          <div class="loader-container" style="display:none !important;justify-content:center !important;align-items:center !important;padding: 30%">
            <span class="loader"></span>
          </div>
          <iframe id="verification-iframe" allow="camera;microphone" width="100%" height="300px"></iframe>
          <button id="back-button" class="button button-outline button-white">Retour</button>
        </div>
    `;

    // add evenet listener to .pick-button elements
    document.querySelectorAll('.verification-option').forEach(button => {
        button.addEventListener('click', function() {
            pickIdentityProvider(identityProviders.find(identityProvider => identityProvider.name === button.id.replace('-button', '')));
        });
    });

    // add event listener to back button
    document.getElementById('back-button').addEventListener('click', function() {
        console.log('back button click')
        showVerificationOptions(identityProviders);
    });

    document.getElementById('back-button-openmodal').addEventListener('click', function() {
      console.log('click')
      // delete "opale-modal-container" element
      var modalContainer = document.getElementById("opale-modal-container");
      // empty modalContainer
      modalContainer.innerHTML = '';
      // create and display the modal
      createModal();
      openModal();
    });

    
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