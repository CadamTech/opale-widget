import { SHA256 } from 'crypto-js';

export  function isOver18() {

  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('opaleverif=')) {
      console.log('COOKIE FOUND');
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
  console.log('SETTING SESSION UUID COOKIE to '+sessionUUID);
  return sessionUUID;
}

export async function getSessionUUID() {
  // IF USER ID WAS PROVIDED, JUST USE THAT
  if (typeof OPALE_USER_ID !== 'undefined') {
    console.log('OPALE_USER_ID IS DEFINED');
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
      console.log('SESSION UUID COOKIE FOUND: '+sessionUUID);
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

    console.log('DATA TO HASH');
    console.log(dataToHash);

    const hashedData = SHA256(dataToHash).toString();

    console.log('CHECKING SIGNATURE');
    console.log('HASH');
    console.log(hash);
    console.log('HASHED DATA');
    console.log(hashedData);
  
    if (hash === hashedData) {
      console.log('SIGNATURE VALID');
      return true;
    }
    console.log('SIGNATURE NOT VALID');
    return false;
}
