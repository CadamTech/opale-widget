export const modalContentLightStyles = `
  #opale-modal-container .button { 
    border-radius: 50px  !important;
    overflow: hidden;
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

    #opale-modal-content {
        background-color: #fff;
        color: #222222;
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
    

    #opale-modal-container .verification-option {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #opale-modal-container .verification-option img {
        max-width: 250px; /* Adjust the image size as needed */
        height: 60px; /* Adjust the image size as needed */
        margin-bottom: 10px;
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

    #opale-modal-container iframe {
      width: 100%;
      min-height: 500px;
      border: none;
      border-radius: 15px;
    }

    #opale-modal-container small a {
      color: #b558ed!important;
    }

`;