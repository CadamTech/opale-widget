import i18n from "./i18n.json";

export function translate(index) {
    return i18n[index][OPALE_LANGUAGE];
}
