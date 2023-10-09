import { createModal, openModal } from './functions/modal.js';
import { loadCSS } from './functions/css.js';
import { env } from './env.js';
import { isOver18, setIsOver18 } from './functions/session.js';

// Check if the cookie exists, if not, create and display the initial modal
window.onload = function () {

    // If param has ?over18=true, set the cookie 
    if (window.location.search.includes('over18=true')) {
      setIsOver18();
    } else {
      if (!isOver18()) {
        createModal(); 
        openModal();
      }
    }
    // Load Milligram CSS
    loadCSS(env.cssFrameWorkUrl);
};