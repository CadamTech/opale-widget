import { env } from '../env.js';

export function getIdentityProviders(userUid) {
    // console log the response
    return fetch(`${env.opaleIdentityProvidersEndpoint}?userUid=${userUid}`)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}