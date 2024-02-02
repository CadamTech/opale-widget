import { env } from "../env.js";

export async function getIdentityProviders(sessionUUID) {
  // Fetch identity providers for the user
  return fetch(
    `${env.opaleIdentityProvidersEndpoint}/${sessionUUID}?key=` +
      OPALE_WEBSITE_ID
  )
    .then((response) => response.json())
    .then((data) => {
      // Return the fetched data
      return data;
    });
}

export async function pickIdentityProvider(provider, uuid = "123") {
  // Fetch the URL from the identity provider and handle the response
  console.log("PICKING IDENTITY PROVIDER");

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

export async function authPopup(mode, sessionUUID) {
  const width = 240;
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - width / 2 + window.screenY;
  const popup = window.open(
    `${env.authenticatorURL}/?mode=${mode}&sessionUUID=${sessionUUID}&OPALE_WEBSITE_ID=${OPALE_WEBSITE_ID}`,
    "popup",
    `width=240,height=240,popup=true,left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
  );
  const checkPopup = setInterval(() => {
    if (popup.window.location.href.includes(CLIENT_URL)) {
      popup.close();
    }
    if (!popup || !popup.closed) return;
    clearInterval(checkPopup);
  }, 1000);
}