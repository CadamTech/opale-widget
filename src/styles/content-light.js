import { darkenColor } from "./css";

export const lightStyle = `

    #opale-modal-container .button-verification {
      background-color: ${OPALE_PRIMARY_COLOR} !important;
      border-color: ${window.OPALE_PRIMARY_COLOR}  !important;
    }
  
    #opale-modal-container .button-verification:hover {
      background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
    }
  
  #opale-modal-container .progress-button {
    background-color: white !important;
    border-color: black !important;
    color: black !important;
  }
  
  #opale-modal-container .progress-button:hover {
    background-color: ${OPALE_PRIMARY_COLOR} !important;
    border-color: ${OPALE_PRIMARY_COLOR} !important;
    color: white !important;
  }
  
  #opale-modal-content {
      background-color: #fff;
      color: #222222;
      text-align: center;
      font-family: sans-serif; /* Use sans-serif font */
  }
  
  #opale-modal-container small a {
    color: #b558ed!important;
  }
  
  #opale-modal-container iframe {
    border-radius: 15px;
  }

  `;
