import { env } from '../env.js';

export async function getIdentityProviders(sessionUUID) {
  // Fetch identity providers for the user
  return fetch(`${env.opaleIdentityProvidersEndpoint}/${sessionUUID}?key=`+OPALE_WEBSITE_ID)
    .then(response => response.json())
    .then(data => {
      // Return the fetched data
      return data;
    });
}

export function pickIdentityProvider(
  provider,
  uuid = "123",
) {
  // Fetch the URL from the identity provider and handle the response
  console.log("PICKING IDENTITY PROVIDER");
  console.log(provider);

  // display loader
  document.querySelector(".loader-container").style.display = "flex";
  // Hide the verification providers
  document.querySelector(".verification-options-content").style.display =
    "none";

  // replace {uuid} by uuid in provider.redirect_url
  provider.redirect_url = provider.redirect_url.replace("{uuid}", uuid);

  const verificationIframe = document.querySelector("#verification-iframe");

  if (provider.iframe_height == "lg") {
    verificationIframe.classList.add("verification-iframe-lg");
  } else {
    verificationIframe.classList.remove("verification-iframe-lg");
  }

  return fetch(provider.redirect_url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".verification-options-container").style.display =
        "none";
      document.querySelector(".verification-options-content").style.display =
        "block";
      document.querySelector("#verification-iframe-container").style.display =
        "block";

      // ADD THEME ATTRIBUTE TO IFRAME URL
      var iframeUrl = data.redirect_url;
      if (typeof OPALE_THEME !== "undefined") {
        iframeUrl += "&theme=" + OPALE_THEME;
      } else {
        iframeUrl += "&theme=none";
      }

      // ADD LANGUAGE ATTRIBUTE TO IFRAME URL
      if (typeof OPALE_LANGUAGE !== "undefined") {
        iframeUrl += "&language=" + OPALE_LANGUAGE;
      } else {
        iframeUrl += "&language=fr";
      }

      // Change the verification iframe src to the provider's redirect_url
      verificationIframe.setAttribute("src", iframeUrl);

      // Show the verification iframe
      document.querySelector(".loader-container").style.display = "none";
      verificationIframe.style.display = "block";
    });
}

export async function storeUsername(sessionUUID, username) {
  fetch(
    `${env.apiUrl}/register_webauthn/${sessionUUID}/?request_type=store-username&username=${username}&key=` +
      OPALE_WEBSITE_ID
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export async function registerWebAuth(sessionUUID, username, domain) {
  const response = await fetch(
    `${env.apiUrl}/register_webauthn/${sessionUUID}/` +
      `?request_type=register` +
      `&username=${username}` +
      `&domain=${domain}` +
      `&key=` +
      OPALE_WEBSITE_ID
  );

  if (!response.ok) {
    throw new Error("Failed to fetch registration options");
  }

  const data = await response.json();
  console.log(data)
  return data;
}
