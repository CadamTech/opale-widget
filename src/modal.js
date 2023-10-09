import { createModal, openModal } from './functions/modal.js';
import { loadCSS } from './functions/css.js';
import { env } from './env.js';
import { isOver18, setIsOver18, checkSignature } from './functions/session.js';

// Check if the cookie exists, if not, create and display the initial modal
window.onload = async function () {

    // If param has ?over18=true, set the cookie 
    var over18CheckPassed = false;
    if (window.location.search.includes('over_18=')) {
      // get value of over_18 param
      const urlParams = new URLSearchParams(window.location.search);
      const over18Param = urlParams.get('over_18');
      console.log('OVER 18 PARAM');
      console.log(over18Param);
      if(await checkSignature(over18Param)) {
        setIsOver18();
        over18CheckPassed = true;
      }
    }

    if (!isOver18() && !over18CheckPassed) {
      createModal(); 
      openModal();
    }
    // Load Milligram CSS
    loadCSS(env.cssFrameWorkUrl);
};