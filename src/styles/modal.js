export const style = `


  #opale-modal-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    z-index: 1000;
    font-family: "Kumbh Sans", sans-serif;
    justify-content: center;
    align-items: center;
    display: flex;
    position: fixed;
    background:rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
  }

  #opale-modal-content {
    max-width: 600px;
    min-height: 600px;
    padding: 2%; /* Default padding for small screens */
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
  }

  @media screen and (max-width: 767px) {
    #opale-modal-content {
      width: 93%;
      height: 93%;
    }
    #over-18-title { 
      margin: 1rem 3rem 1rem 3rem;
    }
  }
`;
