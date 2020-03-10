import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Lato', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .bg-blue {
    background: #0e6cc8;
    padding:16px;
  }
  .margin-remove {
    margin: 0;
  }
  .title {
    font-weight: bold;
    color: #fff;
  }
  .site-card-wrapper {
    background: #ececec;
    padding: 16px;
  }
  .product-style, .time {
    color: #0e6cc8;
  }
  .time {
    font-weight: bold;
    text-decoration: underline;
    text-align: right;
  }
`;

export default GlobalStyle;
