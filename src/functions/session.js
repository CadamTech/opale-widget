export  function isOver18() {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith('over_18=')) {
      return true; // The "over_18" cookie is set
    }
  }
  return false; // The "over_18" cookie is not set
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
