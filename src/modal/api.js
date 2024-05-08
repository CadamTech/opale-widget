import { env } from "../env.js";

export async function getSDKServiceProvider(sessionUUID) {
  try {
    const response = await fetch(
      env.apiUrl +
        "/sdk-service-provider/" +
        sessionUUID +
        "/?key=" +
        OPALE_WEBSITE_ID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Invalid API key", error);
  }
}

export function logIsOver18(sessionUUID, OPALE_WEBSITE_ID) {
  try {
    fetch(env.apiUrl + "/log/" + sessionUUID + "?key=" + OPALE_WEBSITE_ID, {
      method: "POST",
      body: JSON.stringify({
        log_type: "is_over_18",
        value: "",
      }),
      redirect: "follow",
    });
  } catch (error) {
    console.log("error", error);
  }
}

export async function authRedirect(sessionUUID) {
  const origin = window.location.origin;
  window.location.href = `${
    env.authenticatorURL
  }/?OPALE_SESSION_UUID=${sessionUUID}&origin=${encodeURIComponent(
    origin
  )}&OPALE_WEBSITE_ID=${OPALE_WEBSITE_ID}&OPALE_LANGUAGE=${OPALE_LANGUAGE}&OPALE_THEME=${OPALE_THEME}&OPALE_PRIMARY_COLOR=${encodeURIComponent(
    OPALE_PRIMARY_COLOR
  )}&OPALE_LOGO=${encodeURIComponent(OPALE_LOGO)}`;
}
