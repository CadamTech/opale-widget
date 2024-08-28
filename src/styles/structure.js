export const style = `

  *, *:after, *:before {
    box-sizing: inherit;
  }

  #opale-logo { 
    max-height: 80px;
  }

  #over-18-title {
    font-size: 1rem;
    margin: 1rem 6rem 1rem 6rem;
    font-weight: normal;
  }

  #opale-modal-container .loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: none;
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
    
  #poweredByOpale {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-weight: 300;
    cursor: pointer;
    display: flex;
    align-items: center;
    }

    #opaleLogo {
    height: 1.8rem;
    }

    #opale-modal-container .verification-button {
      min-width: 12rem;
      border-radius: .5rem !important;
      color: white;
      font-size: 1rem;
      height: 2.5rem;
      border: none;
      cursor: pointer;
      margin: .5rem;
      padding: 0 1rem 0 1rem;
    }

    #opale-modal-container .back-button {
      min-width: 12rem;
      border-radius: .5rem !important;
      font-size: 1rem;
      height: 2.5rem;
      cursor: pointer;
      margin: .5rem;
      padding: 0 1rem 0 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #opale-modal-container .buttons-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;
