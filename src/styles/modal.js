export const style = `

  #opale-modal-container, #opale-modal-content { 
    padding: 1%;
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
    width: 100%;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.8);
    backdrop-filter:blur(5px);
  }
  #opale-modal-content {
    max-width: 600px;
    min-height: 600px;
    padding: 2%; /* Default padding for small screens */
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: sans-serif; /* Use sans-serif font */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
  }
`;
