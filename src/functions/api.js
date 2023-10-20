import { env } from '../env.js';

export async function getIdentityProviders(sessionUUID) {
  // Fetch identity providers for the user
  return fetch(`${env.opaleIdentityProvidersEndpoint}/${sessionUUID}?key=`+OPALE_WEBSITE_ID)
    .then(response => response.json())
    .then(data => {
      // Return the fetched data
      return data;
    });
}

export function pickIdentityProvider(provider, uuid = '123') {
  // Fetch the URL from the identity provider and handle the response
  console.log('PICKING IDENTITY PROVIDER');
  console.log(provider);
  // // Listen to messages from child window
  // window.addEventListener('message', function(event) {
  //   console.log('EVENT RECEIVED');
  //   console.log(event);
  //   console.log(event.data);
  //   console.log(event.origin);
  //   console.log(event.source);
  //   console.log(event.source.location);
  // }, false);

  // display loader
  document.querySelector('.loader-container').style.display = 'flex';
  // Hide the verification providers
  document.querySelector('.verification-options-content').style.display = 'none';

  // replace {uuid} by uuid in provider.redirect_url
  provider.redirect_url = provider.redirect_url.replace('{uuid}', uuid);

  const verificationIframe = document.querySelector('#verification-iframe');

  if (provider.iframe_height == 'lg') {
    verificationIframe.classList.add('verification-iframe-lg');
  } else {
    verificationIframe.classList.remove('verification-iframe-lg');
  }

  return fetch(provider.redirect_url)
    .then(response => response.json())
    .then(data => {    
      document.querySelector('.verification-options-container').style.display = 'none';
      document.querySelector('.verification-options-content').style.display = 'block';
      document.querySelector('#verification-iframe-container').style.display = 'block';

      // ADD THEME ATTRIBUTE TO IFRAME URL 
      var iframeUrl = data.redirect_url;
      if (typeof OPALE_THEME !== 'undefined') {
        iframeUrl += '&theme='+OPALE_THEME;
      }

      // Change the verification iframe src to the provider's redirect_url
      verificationIframe.setAttribute('src', iframeUrl);

      // Show the verification iframe
      document.querySelector('.loader-container').style.display = 'none';
      verificationIframe.style.display = 'block';
    });
}
