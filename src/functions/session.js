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

export function setIsOver18() {
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
  return sessionUUID;
}
