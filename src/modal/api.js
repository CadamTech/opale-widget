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

export function logIsOver18(sessionUUID, OPALE_WEBSITE_ID) {
  fetch(env.apiUrl + "/log/" + sessionUUID + "?key=" + OPALE_WEBSITE_ID, {
    method: "POST",
    body: JSON.stringify({
      log_type: "is_over_18",
      value: "",
    }),
    redirect: "follow",
  }).catch((error) => console.log("error", error));
}

export async function authPopup(mode, sessionUUID, identityProviderId) {
  const origin = window.location.origin;
  const screenX = window.screen.width;
  const screenY = window.screen.height;
  const width = screenX / 4;
  const height = screenY / 2;
  const left = screenX / 2 - width / 2;
  const top = screenY / 2 - height / 2;

  window.open(
    `${env.authenticatorURL}/?mode=${mode}&sessionUUID=${sessionUUID}&origin=${encodeURIComponent(origin)}&identityProviderId=${identityProviderId}&OPALE_WEBSITE_ID=${OPALE_WEBSITE_ID}&OPALE_LANGUAGE=${OPALE_LANGUAGE}`,
    "popup",
    `width=${width},height=${height},popup=true,left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
  );
}