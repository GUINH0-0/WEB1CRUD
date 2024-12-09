import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  /* Resetando estilos padrão */
  * {
    margin: 0;
    padding: 0;
    font-family: 'Almendra SC', serif; /* Fonte personalizada */
    box-sizing: border-box;
  }

  /* Estilos do Body */
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; /* Alinha a tela de login ao centro */
    background: linear-gradient(to bottom, #1a1918, #3b3b3b);
    background-image: url("https://i.imgur.com/O4FeIUN.png");
    background-size: cover; /* Faz com que a imagem cubra toda a tela */
    background-position: center;
    background-repeat: no-repeat;
    color: #e8cc13; /* Cor dourada para texto */
    font-size: 20px; /* Tamanho da fonte base */
    text-shadow: 1px 1px 2px black, 0 0 1px darkorange;
  }

    input[type="date"]::-webkit-calendar-picker-indicator {
    background-color: orange;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default Global;
