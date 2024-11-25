import { env } from "../env.js";

export async function getServiceProviderConfig() {
    try {
        const response = await fetch(
            env.apiUrl +
                "/service-provider-config/" +
                OPALE_USER_ID +
                "/?key=" +
                window.OPALE_WEBSITE_ID +
                "&origin=widget",
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Invalid API key", error);
    }
}

export async function logIsOver18() {
    try {
        await fetch(env.apiUrl + "/log/" + OPALE_USER_ID + "?key=" + OPALE_WEBSITE_ID, {
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

export function authRedirect(autoAgekey = false) {
    try {
        window.location.href = `${
            env.authenticatorURL
        }/?OPALE_SESSION_UUID=${OPALE_USER_ID}&OPALE_WEBSITE_ID=${OPALE_WEBSITE_ID}${autoAgekey && "&AGEKEY=true"}`;
    } catch (error) {
        console.log("Error occurred redirecting user", error);
    }
}
