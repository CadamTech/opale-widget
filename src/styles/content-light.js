import { darkenColor } from "./css";

export const modalContentLightStyles = `

  #opale-modal-container .back-button { 
    background-color: #ffffff !important;
    color: ${darkenColor(OPALE_PRIMARY_COLOR, 70)} !important;
    border-color: ${darkenColor(OPALE_PRIMARY_COLOR, 70)} !important;
  }

  #opale-modal-container .back-button:hover { 
    color: ${OPALE_PRIMARY_COLOR} !important;
    border-color: ${OPALE_PRIMARY_COLOR} !important;
  }
  
  #opale-modal-container .button-verification {
    background-color: ${OPALE_PRIMARY_COLOR} !important;
    border-color: ${OPALE_PRIMARY_COLOR}  !important;
  }

  #opale-modal-container .button-verification:hover {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
  }

  .progress-button {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 40)} !important;
    border-color: ${darkenColor(OPALE_PRIMARY_COLOR, 40)} !important;
  }

  .progress-button:hover {
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 30)} !important;
    border-color: ${darkenColor(OPALE_PRIMARY_COLOR, 30)} !important;
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