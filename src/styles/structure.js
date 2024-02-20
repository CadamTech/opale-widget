import {darkenColor} from "./css"

export const modalContentStructure = `

  #opale-logo { 
    max-height: 100px;
  }

  #opale-modal-container, #opale-modal-content { 
    width: 100%;
  } 

  #opale-modal-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #opale-modal-container .loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin:15px auto;
    position: relative;
    color: #FFF;
    left: -100px;
    box-sizing: border-box;
    animation: shadowRolling 2s linear infinite;
  }

  @keyframes shadowRolling {
    0% {
      box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow: 100px 0 white, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 110px 0 white, 100px 0 white, 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
    }
    36% {
      box-shadow: 120px 0 white, 110px 0 white, 100px 0 white, 0px 0 rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 130px 0 white, 120px 0 white, 110px 0 white, 100px 0 white;
    }
    62% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 white, 120px 0 white, 110px 0 white;
    }
    75% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 white, 120px 0 white;
    }
    87% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 130px 0 white;
    }
    100% {
      box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
    }
  }

  /* Default styles for larger screens (e.g., computers) */
  #opale-modal-content .verification-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
  }

  #opale-modal-content .verification-option {
    margin-top: 10%;
    margin-bottom: 10%;
    cursor: pointer;
  }

  #opale-modal-content .verification-options-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: auto;
  }

  #opale-modal-content .verification-options-content {
    height: 100%;
  }

  #opale-modal-container .verification-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20rem;
      margin: 0 1rem 0 1rem;
  }

  #opale-modal-container .verification-option img {
      max-width: 250px; /* Adjust the image size as needed */
      height: 60px; /* Adjust the image size as needed */
      margin-bottom: 10px;
  }

  #verification-options button {
    width: 75%;
  }

    #opale-modal-content button {
    border-radius: 50px !important;
  }
  
  #opale-modal-container .button-verification {
    width: 100% !important;
  }

  #opale-modal-container .button { 
    border-radius: 50px  !important;
    overflow: hidden;
  }

  #opale-modal-container .back-button { 
    width: 15rem !important;
    overflow: hidden;
    padding: 0;
    font-size: .85rem;
  }

  .progress-buttons-container {
    margin-top: 1rem;
    display: grid;
    justify-items: center;
    align-items: center;
    min-width: 35rem;
  }

  .progress-button {
    width: 15rem;
    position: relative;
    padding: 0;
    border-radius: 50px;
    font-size: .85rem;
  }

  #opale-modal-container #verification-iframe {
    display: none;
  }

  #opale-modal-container .verification-iframe-lg { 
    height: 80vh;
  }

  #opale-modal-container #verification-iframe-container {
    width: 100%;
    height: 100%;
  }

  #opale-modal-container .button { 
    border-radius: 50px !important;
    overflow: hidden;
    width: 100%;
  }

  #opale-modal-container iframe {
    width: 100%;
    min-height: 500px;
    border: none;
  }

  .progress-button .tooltip {
    visibility: hidden;
    text-align: left;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 120%;
    left: -10%;
    margin-left: -60px;
    opacity: 0;
    width: 20rem;
    white-space: normal;
    transition: opacity 0.3s;
    line-height: 1rem;
    background-color: ${darkenColor(OPALE_PRIMARY_COLOR, 50)} !important; 
    color: #fffff;
    text-transform: none;
    font-weight: 100;
    }

  .progress-button .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${darkenColor(
      OPALE_PRIMARY_COLOR,
      50
    )} transparent transparent transparent;
  }

  .progress-button:hover .tooltip {
    visibility: visible;
    opacity: .9;
  }
  
  /* Styles for mobile devices (screen width less than 768px) */
  @media screen and (max-width: 767px) {
      #opale-modal-content .verification-option {
        margin-top: 5%;
        margin-bottom: 5%;
      }
      #opale-modal-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: around;
      }
      #opale-modal-container .verification-option {
        width: 15rem;
      }
      #opale-modal-container .button-verification {
        padding: 0;
        font-size: 1rem;
      }
      .progress-button .tooltip {
        left: 0%;
      }
    }
`;