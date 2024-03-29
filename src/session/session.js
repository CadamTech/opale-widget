import { SHA256 } from 'crypto-js';

export  function isOver18() {

  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('opaleverif=')) {
      return true; // The "opaleverif" cookie is set
    }
  }
  return false; // The "opaleverif" cookie is not set
}

export function setIsOver18(signature) {
  document.cookie = 'opaleverif='+signature+';path=/;Secure';
}

// uuid management

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateSessionUUID() {
  const sessionUUID = generateUUID();
  // set a session cookie
  document.cookie = 'opaleuuid='+sessionUUID+';path=/;expires=0;Secure';
  return sessionUUID;
}

export async function getSessionUUID() {
  // IF USER ID WAS PROVIDED, JUST USE THAT
  if (typeof OPALE_USER_ID !== 'undefined') {
    return OPALE_USER_ID;
  }

  // ELSE SET A UID IN A SESSION COOKIE

  // get the opaleuuid cookie value
  var cookies = document.cookie.split(';');
  var sessionUUID = null;

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('opaleuuid=')) {
      sessionUUID = cookie.substring('opaleuuid='.length, cookie.length);
      break;
    }
  }
  if (!sessionUUID) sessionUUID = generateSessionUUID()

  return sessionUUID;
}

export async function checkSignature(hash) {
    const sessionUUID = await getSessionUUID();
    // CALCULATING HASH FOR "TRUE" ANSWER ONLY
    const dataToHash = "true" + OPALE_WEBSITE_ID + sessionUUID;
    const hashedData = SHA256(dataToHash).toString();
    if (hash === hashedData) {
      return true;
    }
    return false;
}