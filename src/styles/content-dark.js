import { darkenColor } from "./css";

export const modalContentDarkStyles = `

  #opale-modal-container .button { 
    border-radius: 50px  !important;
    overflow: hidden;
  }

  #opale-modal-container .button-outline { 
    color: #ffffff !important;
  }
  
  #opale-modal-container .button-verification {
    background-color: ${OPALE_PRIMARY_COLOR} !important;
    border-color: ${OPALE_PRIMARY_COLOR}  !important; 
    width: 100%;
  }

  #opale-modal-container .button-verification:hover {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
  }

  .progress-button {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 40)} !important;
  }

  .progress-button:hover {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 30)} !important;
  }

  #opale-modal-container .button-white {
    color: #ffffff !important;
    border-color: #ffffff  !important;
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