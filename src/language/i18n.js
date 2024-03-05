import i18nArray from "./i18n.json";

export function i18n(index) {
  const result = i18nArray[index][OPALE_LANGUAGE];
  if (result) {
    return result;
  } else {
    return "";
  }
}
