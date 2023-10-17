import { createModal, openModal, closeModal } from './functions/modal.js';
import { loadCSS } from './functions/css.js';
import { env } from './env.js';
import { isOver18, setIsOver18, checkSignature } from './functions/session.js';

// Check if the cookie exists, if not, create and display the initial modal
window.onload = async function () {
    // Load Milligram CSS
    loadCSS(env.cssFrameWorkUrl);

    // If param has ?over18=true, set the cookie 
    var over18CheckPassed = false;
    if (window.location.search.includes('opaleverif=')) {
      // get value of opaleverif param
      const urlParams = new URLSearchParams(window.location.search);
      const over18Param = urlParams.get('opaleverif');
      if(await checkSignature(over18Param)) {
        setIsOver18(over18Param);
        over18CheckPassed = true;
        // Remove opaleverif param from url
        window.history.replaceState({}, document.title, "/" + window.location.href.split('/').pop().replace('?opaleverif='+over18Param, ''));
        
      }
    }

    if (!isOver18() && !over18CheckPassed) {
      createModal(); 
      openModal();
    } else {
      console.log('Opale: session valid');
      closeModal();
    }
};