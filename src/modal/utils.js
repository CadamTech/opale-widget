

export async function checkIfWebAuthnISAvailable() {
  if (typeof PublicKeyCredential === "undefined") {
    return false;
  } else {
    try {
      const isAvailable =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return isAvailable;
    } catch (error) {
      console.error(
        "Error checking platform authenticator availability:",
        error
      );
      return false;
    }
  }
}
