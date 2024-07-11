import { darkenColor } from "./css";

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
    }

    #opaleGem {
    height: 1.8rem;
    }

    #opale-modal-container .verification-button {
      min-width: 10rem;
      border-radius: 3px !important;
      color: white;
      height: 2rem;
      border: none;
      cursor: pointer;
      margin: .5rem;
      padding: 0 1rem 0 1rem;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.16), 2px 2px 2px rgba(0,0,0,0.23);
    }

    #opale-modal-container .back-button {
      height: 1.5rem;
      cursor: pointer;
      margin: .5rem;
      font-size: .8rem;
      text-decoration: none;
      text-decoration: underline;
    }


    #opale-modal-container .buttons-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;
