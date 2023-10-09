import { env } from '../env.js';
import { getSessionUUID } from './session.js';

export async function getIdentityProviders() {
  const sessionUid = await getSessionUUID();
  // Fetch identity providers for the user
  return fetch(`${env.opaleIdentityProvidersEndpoint}/${sessionUid}`)
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
  document.querySelector('.loader').style.display = 'block';
  // Hide the verification providers
  document.querySelector('.verification-options-content').style.display = 'none';

  // replace {uuid} by uuid in provider.redirect_url
  provider.redirect_url = provider.redirect_url.replace('{uuid}', uuid);

  console.log('FETCHING PROVIDER REDIRECT URL');
  console.log(provider.redirect_url);

  return fetch(provider.redirect_url)
    .then(response => response.json())
    .then(data => {    
      console.log('GOT DATA SETTING IFRAME SRC TO');
      console.log(data.redirect_url);
      document.querySelector('.verification-options-container').style.display = 'none';
      document.querySelector('.verification-options-content').style.display = 'block';

      // Change the verification iframe src to the provider's redirect_url
      document.querySelector('#verification-iframe').setAttribute('src', data.redirect_url);

      // Show the verification iframe
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('#verification-iframe').style.display = 'block';
    });
}
