import { darkenColor } from "./css";

export const modalContentDarkStyles = `
  
  #opale-modal-container .button-verification {
    background-color: ${OPALE_PRIMARY_COLOR} !important;
    border-color: ${OPALE_PRIMARY_COLOR}  !important;
  }

  #opale-modal-container .button-verification:hover {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
  }

  #opale-modal-container .progress-button {
    background-color: black !important;
    border-color: white !important;
    color: white !important;
  }

  #opale-modal-container .progress-button:hover {
    border-color: ${OPALE_PRIMARY_COLOR} !important;
    background-color: ${OPALE_PRIMARY_COLOR} !important;
    color: white !important;
  }

  #opale-modal-content {
      background-color: #000000;
      color: #dddddd;
      font-family: sans-serif; /* Use sans-serif font */
  }

  #opale-modal-container small a {
    color: #b558ed!important;
  }

  #opale-modal-container iframe {
    border-radius: 15px;
  }
`;