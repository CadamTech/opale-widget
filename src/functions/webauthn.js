import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  verifyAuthenticationResponse,
  generateAuthenticationOptions,
} from "./api";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

export async function registerPasskey(sessionUUID) {
  // Create registration options
  const opts = await generateRegistrationOptions(sessionUUID);
  // Send options and receive attestation
  const parsedOpts = JSON.parse(opts);
  const attResp = await startRegistration(parsedOpts);
  // Verify registration completion and receive registrationVerification
  await verifyRegistrationResponse(sessionUUID, attResp);
}



export async function validatePasskey(sessionUUID) {
  const authenticationOptions = await generateAuthenticationOptions();
  // Create validation options
  const assResp = await startAuthentication(
    JSON.parse(authenticationOptions)
  );
  const stringifiedAssResp = JSON.stringify(assResp);
  const encodedAssResp = encodeURIComponent(stringifiedAssResp);
  // Validate response
  await verifyAuthenticationResponse(sessionUUID, encodedAssResp);
}
