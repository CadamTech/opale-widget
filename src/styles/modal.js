export const modalStyles = `

  .button { 
    border-radius: 50px  !important;
  }

  .button-pink {
    background-color: #d0006f !important;
    border-color: #d0006f  !important;
  }

  .button-white {
    color: #ffffff !important;
    border-color: #ffffff  !important;
  }

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

  #opale-modal-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8); /* 80% darker with transparency */
    backdrop-filter: blur(5px); /* Apply background blur effect */
    z-index: -1; /* Place it behind the modal content */
  }

    #modal-content {
        background-color: #000000;
        color: #dddddd;
        width: 80%;
        max-width: 600px;
        padding: 20px;
        border-radius: 5px;
        min-height: 600px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        font-family: sans-serif; /* Use sans-serif font */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* Default styles for larger screens (e.g., computers) */
    .verification-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
    }

    .verification-options-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    
    /* Styles for mobile devices (screen width less than 768px) */
    @media screen and (max-width: 767px) {
        .verification-options {
            grid-template-columns: 1fr; /* Display as a single column */
        }
        .verification-option {
          margin-top: 10%;
        }
        #modal-content {
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