function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateSessionUUID() {
  const sessionUUID = generateUUID();
  return sessionUUID;
}

export function abTestProfiles() {
  if (
    window.OPALE_WEBSITE_ID === "f5a2e1d8-9c73-4b6f-8e02-1d7a94c3f6b0" ||
    window.OPALE_WEBSITE_ID === "b7e9c2d4-3f58-42a1-9d70-6c5f8ae0b2e1"
  ) {
    window.OPALE_WEBSITE_ID =
      Math.random() < 0.5
        ? "f5a2e1d8-9c73-4b6f-8e02-1d7a94c3f6b0"
        : "b7e9c2d4-3f58-42a1-9d70-6c5f8ae0b2e1";
  }
}
