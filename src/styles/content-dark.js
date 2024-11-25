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
    }

    #opale-modal-container .back-button {
      color: white;
      border: 1px solid white;
    }

    #opale-modal-container .back-button:hover {
      border: 1px solid ${OPALE_PRIMARY_COLOR};
      background-color: ${OPALE_PRIMARY_COLOR};
    }

    #opale-modal-container .back-button:visited {
      text-decoration: none; color: white;
    }

    #agekey-button {
      background-color: ${OPALE_PRIMARY_COLOR};
      border: 1px solid ${OPALE_PRIMARY_COLOR};
    } 
    
    #agekey-button:hover {
      background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 10)};
      border: 1px solid ${darkenColor(OPALE_PRIMARY_COLOR, 10)};
    } 
  `;
