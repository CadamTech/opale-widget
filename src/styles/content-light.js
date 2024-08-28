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
    }

    #opale-modal-container .back-button {
      color: black;
      border: 1px solid black;
    }
    
    #opale-modal-container .back-button:hover {
      color: white;
      border: 1px solid ${OPALE_PRIMARY_COLOR};
      background-color: ${OPALE_PRIMARY_COLOR};
    }

    #opale-modal-container .back-button:visited {
      text-decoration: none; color: black;
    }
  

  `;
