import { SHA256 } from 'crypto-js';

export  function isOver18() {
  console.log('CHECKING COOKIE');
  var cookies = document.cookie.split(';');
  console.log(cookies)
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('over_18=')) {
      console.log('COOKIE FOUND');
      return true; // The "over_18" cookie is set
    }
  }
  return false; // The "over_18" cookie is not set
}

export async function setIsOver18() {
  console.log('SETTING COOKIE');
  // set cookie for 1 week
  document.cookie = 'over_18=true;path=/;max-age=604800;Secure';
}

// uuid management

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getSessionUUID() {
  var sessionUUID = localStorage.getItem('sessionUUID');
  if (!sessionUUID) {
    sessionUUID = generateUUID();
    localStorage.setItem('sessionUUID', sessionUUID);
  }
  // debug cuz PJ is late af
  return '123'; 
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
