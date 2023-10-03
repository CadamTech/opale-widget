import { getIdentityProviders, pickIdentityProvider } from './api';
import { modalStyles } from '../styles/modal';
// Add CSS styles for the modal


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
        <h4 style="margin:10%">Ce site est accessible uniquement aux personnes âgées de 18 ans et plus</h4>
        <div>
          <button id="over-18-button" class="button button-pink" style="width:100%;margin-bottom:5%">J'ai 18 ans ou plus</button>
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

    var modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <div class="verification-options-container">
          <div class="verification-options-content">
            <h5>Choisissez l'une des options suivantes pour vérifier votre âge.</h5>
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