import { darkenColor } from "./css";

export const style = `

    #opale-modal-container .verification-button {
      background-color: ${OPALE_PRIMARY_COLOR} !important;
      border-color: ${OPALE_PRIMARY_COLOR} !important;
    }

    #opale-modal-container .verification-button:hover {
      background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)} !important;
    }

    #opale-modal-content {
      background-color: #111111;
      color: #dddddd;
      font-family: sans-serif;
    }

    #opale-modal-container .back-button {
      color: white;
    }

    #opale-modal-container .back-button:visited {
      text-decoration: none; color: white;
    }
  

  `;
