/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/env.js":
/*!********************!*\
  !*** ./src/env.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   env: () => (/* binding */ env)\n/* harmony export */ });\nconst API_URL = \"https://lpgdtgx5l5.execute-api.eu-west-3.amazonaws.com/prod\";\n\nconst env = {\n  \"opaleIdentityProvidersEndpoint\": `${API_URL}/identity-providers`,\n  \"cssFrameWorkUrl\": \"https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css\"\n};\n\n//# sourceURL=webpack://modal/./src/env.js?");

/***/ }),

/***/ "./src/functions/api.js":
/*!******************************!*\
  !*** ./src/functions/api.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getIdentityProviders: () => (/* binding */ getIdentityProviders)\n/* harmony export */ });\n/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env.js */ \"./src/env.js\");\n\n\nfunction getIdentityProviders(userUid) {\n    // console log the response\n    return fetch(`${_env_js__WEBPACK_IMPORTED_MODULE_0__.env.opaleIdentityProvidersEndpoint}?userUid=${userUid}`)\n        .then(response => response.json())\n        .then(data => {\n            return data;\n        });\n}\n\n//# sourceURL=webpack://modal/./src/functions/api.js?");

/***/ }),

/***/ "./src/functions/css.js":
/*!******************************!*\
  !*** ./src/functions/css.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadCSS: () => (/* binding */ loadCSS)\n/* harmony export */ });\nfunction loadCSS(url) {\n  const link = document.createElement(\"link\");\n  link.rel = \"stylesheet\";\n  link.href = url;\n  document.head.appendChild(link);\n}\n\n//# sourceURL=webpack://modal/./src/functions/css.js?");

/***/ }),

/***/ "./src/functions/modal.js":
/*!********************************!*\
  !*** ./src/functions/modal.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   createModal: () => (/* binding */ createModal),\n/* harmony export */   getCookie: () => (/* binding */ getCookie),\n/* harmony export */   openModal: () => (/* binding */ openModal),\n/* harmony export */   showVerificationOptions: () => (/* binding */ showVerificationOptions)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/functions/api.js\");\n\n\n// Fonction pour vérifier si un cookie existe\nfunction getCookie(cookieName) {\n  var name = cookieName + \"=\";\n  var decodedCookie = decodeURIComponent(document.cookie);\n  var cookieArray = decodedCookie.split(';');\n  for (var i = 0; i < cookieArray.length; i++) {\n      var cookie = cookieArray[i];\n      while (cookie.charAt(0) == ' ') {\n          cookie = cookie.substring(1);\n      }\n      if (cookie.indexOf(name) == 0) {\n          return true;\n      }\n  }\n  return false;\n}\n\n// Add CSS styles for the modal\nvar modalStyles = `\n\n  .button { \n    border-radius: 50px  !important;\n  }\n\n  .button-pink {\n    background-color: #d0006f !important;\n    border-color: #d0006f  !important;\n  }\n\n  .button-white {\n    color: #ffffff !important;\n    border-color: #ffffff  !important;\n  }\n\n  #opale-modal-container {\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1000;\n    justify-content: center;\n    align-items: center;\n    display: flex;\n  }\n\n  #opale-modal-container::before {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8); /* 80% darker with transparency */\n    backdrop-filter: blur(5px); /* Apply background blur effect */\n    z-index: -1; /* Place it behind the modal content */\n  }\n\n    #modal-content {\n        background-color: #000000;\n        color: #dddddd;\n        width: 80%;\n        max-width: 600px;\n        padding: 20px;\n        border-radius: 5px;\n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n        text-align: center;\n        font-family: sans-serif; /* Use sans-serif font */\n    }\n\n    .verification-options {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        // gap: 20px;\n        justify-items: center;\n        align-items: center;\n    }\n\n    .verification-option {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n    }\n\n    .verification-option img {\n        max-width: 250px; /* Adjust the image size as needed */\n        height: 60px; /* Adjust the image size as needed */\n        margin-bottom: 10px;\n    }\n`;\n\n// Create a <style> element and append the CSS rules to it\nvar styleElement = document.createElement(\"style\");\nstyleElement.textContent = modalStyles;\ndocument.head.appendChild(styleElement);\n\n// Fonction pour créer et afficher le modal\nfunction createModal() {\n    var modalContainer = document.createElement(\"div\");\n    modalContainer.id = \"opale-modal-container\";\n\n    var modalContent = document.createElement(\"div\");\n    modalContent.id = \"modal-content\";\n    modalContent.innerHTML = `\n        <img src=\"https://ga.dorcel.com/resources/d-header-logo-vision-strait/1638278048.png\" alt=\"Dorcel Logo\">\n        <h2>Are You Over 18?</h2>\n        <button id=\"over-18-button\" class=\"button button-pink\">I'm Over 18</button>\n        <button id=\"not-over-18-button\" class=\"button button-outline button-white\">Exit</button>\n    `;\n\n    modalContainer.appendChild(modalContent);\n    document.body.appendChild(modalContainer);\n\n    // // Create a link element for the CSS file\n    // var cssLink = document.createElement(\"link\");\n    // cssLink.rel = \"stylesheet\";\n    // cssLink.href = \"path/to/your/modal.css\"; // Adjust the path to your CSS file\n    // document.head.appendChild(cssLink);\n\n    // Ajouter un écouteur d'événements au bouton \"I'm Over 18\"\n    var over18Button = document.getElementById(\"over-18-button\");\n    over18Button.addEventListener(\"click\", function() {\n        showVerificationOptions();\n    });\n\n    // Warm identity providers\n    (0,_api__WEBPACK_IMPORTED_MODULE_0__.getIdentityProviders)();\n}\n\n// Fonction pour afficher les options de vérification\nasync function showVerificationOptions() {\n\n    const identityProviders = await (0,_api__WEBPACK_IMPORTED_MODULE_0__.getIdentityProviders)();\n\n    console.log('IDENTITY PROVIDERS FROM MODAL.JS');\n    console.log(identityProviders);\n\n    var modalContent = document.getElementById(\"modal-content\");\n    modalContent.innerHTML = `\n        <h2>Age verification needed</h2>\n        <h6>Use one of the methods below to verify your age</h6>\n        <div class=\"verification-options\">\n            ${identityProviders.map(identityProvider => `\n                <div class=\"verification-option \">\n                    <img src=\"${identityProvider.logo}\" alt=\"${identityProvider.name}\">\n                    <a href=\"${identityProvider.redirect_url}\" id=\"${identityProvider.name}-button\" class=\"button button-pink\">${identityProvider.description}</a>\n                </div>\n            `).join('')}\n        </div>\n    `;\n\n    // Ajouter un écouteur d'événements aux boutons de vérification\n    var faceVerificationButton = document.getElementById(\"face-verification-button\");\n    faceVerificationButton.addEventListener(\"click\", function() {\n        // Handle face age verification logic here\n        alert(\"Face Age Verification Placeholder\");\n    });\n\n    var idVerificationButton = document.getElementById(\"id-verification-button\");\n    idVerificationButton.addEventListener(\"click\", function() {\n        // Handle ID verification logic here\n        alert(\"ID Verification Placeholder\");\n    });\n\n    var franceConnectButton = document.getElementById(\"france-connect-button\");\n    franceConnectButton.addEventListener(\"click\", function() {\n        // Handle France Connect logic here\n        alert(\"France Connect Placeholder\");\n    });\n\n    var creditCardVerificationButton = document.getElementById(\"credit-card-verification-button\");\n    creditCardVerificationButton.addEventListener(\"click\", function() {\n        // Handle credit card verification logic here\n        alert(\"Credit Card Verification Placeholder\");\n    });\n\n    openModal();\n}\n\n// Fonction pour ouvrir le modal\nfunction openModal() {\n    var modal = document.getElementById(\"opale-modal-container\");\n    modal.style.display = \"flex\"; // Use flex to center the modal\n}\n\n// Fonction pour fermer le modal\nfunction closeModal() {\n    var modal = document.getElementById(\"opale-modal-container\");\n    modal.style.display = \"none\";\n}\n\n//# sourceURL=webpack://modal/./src/functions/modal.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _functions_modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions/modal.js */ \"./src/functions/modal.js\");\n/* harmony import */ var _functions_css_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/css.js */ \"./src/functions/css.js\");\n/* harmony import */ var _env_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./env.js */ \"./src/env.js\");\n\n\n\n\n// Check if the cookie exists, if not, create and display the initial modal\nwindow.onload = function () {\n    // if (!getCookie(\"modalDisplayed\")) {\n        (0,_functions_modal_js__WEBPACK_IMPORTED_MODULE_0__.createModal)(); \n        (0,_functions_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();\n        // Load Milligram CSS\n        (0,_functions_css_js__WEBPACK_IMPORTED_MODULE_1__.loadCSS)(_env_js__WEBPACK_IMPORTED_MODULE_2__.env.cssFrameWorkUrl);\n    // }\n};\n\n//# sourceURL=webpack://modal/./src/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/modal.js");
/******/ 	
/******/ })()
;