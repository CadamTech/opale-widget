import { env } from "../env.js";

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


export async function authRedirect(sessionUUID) {
  const origin = window.location.origin;
  window.location.href = `${
    env.authenticatorURL
  }/?sessionUUID=${sessionUUID}&origin=${encodeURIComponent(
    origin
  )}&OPALE_WEBSITE_ID=${OPALE_WEBSITE_ID}&OPALE_LANGUAGE=${OPALE_LANGUAGE}&OPALE_THEME=${OPALE_THEME}&OPALE_PRIMARY_COLOR=${encodeURIComponent(
    OPALE_PRIMARY_COLOR
  )}&OPALE_LOGO=${encodeURIComponent(OPALE_LOGO)}`;
}