export const modalStyles = `


  #opale-modal-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  #opale-modal-container .button { 
    border-radius: 50px  !important;
  }

  #opale-modal-container .button-pink {
    background-color: #d0006f !important;
    border-color: #d0006f  !important;
  }

  #opale-modal-container .button-pink:hover {
    background-color: #c0005f !important;
  }

  #opale-modal-container .button-white {
    color: #ffffff !important;
    border-color: #ffffff  !important;
  }

  #opale-modal-container .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 

    #opale-modal-content {
        background-color: #000000;
        color: #dddddd;
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border-radius: 5px;
        min-height: 600px;
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
        text-align: center;
        font-family: sans-serif; /* Use sans-serif font */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    
    /* Styles for mobile devices (screen width less than 768px) */
    @media screen and (max-width: 767px) {
        #opale-modal-content .verification-options {
            grid-template-columns: 1fr; /* Display as a single column */
        }
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
    }
    

    .verification-option {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .verification-option img {
        max-width: 250px; /* Adjust the image size as needed */
        height: 60px; /* Adjust the image size as needed */
        margin-bottom: 10px;
    }

    #verification-iframe {
      display: none;
      height: 80vh;
    }

    #verification-iframe-container {
      width: 100%;
      height: 100%;
    }


    iframe {
      width: 100%;
      height: 80%;
      min-height: 400px;
      border: none;
      border-radius: 15px;
    }

    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #FFF;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      }
  
      @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
      } 

`;