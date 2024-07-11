import { darkenColor } from "./css";

export const style = `

    #opale-modal-container .verification-button {
      background-color: ${OPALE_PRIMARY_COLOR} !important;
      border-color: ${window.OPALE_PRIMARY_COLOR}  !important;
    }
  
    #opale-modal-container .verification-button:hover {
      background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
    }
  
    #opale-modal-content {
      background-color: #f8fcff;
      color: #222222;
      text-align: center;
      font-family: sans-serif; /* Use sans-serif font */
    }

    #opale-modal-container .back-button {
      color: black;
    }

    #opale-modal-container .back-button:visited {
      text-decoration: none; color: black;
    }
  

  `;
