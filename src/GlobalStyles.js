import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
    text-align: center;
    }

    button {
    padding: 0.5rem;
    border-radius: 5px;
    border: solid black 1px;
    }

    form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem auto;
    }

    button,
    .button-54 {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    cursor: pointer;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
        5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    }

    .button-54:active {
    box-shadow: 0px 0px 0px 0px;
    top: 5px;
    left: 5px;
    transform: translateY(2px);
    }

    @media (min-width: 768px) {
    .button-54 {
        padding: 0.25em 0.75em;
    }
    }

    p {
    text-align: center;
    }

    a:link {
    text-decoration: none;
    color: blue;
    }

    a:visited {
    text-decoration: none;
    /* color: black; */
    }

    a:hover {
    text-decoration: none;
    }

    a:active {
    text-decoration: none;
    }

    input {
    padding: 0.5rem;
    border-radius: 5px;
    border: solid lightgray 1px;
    }

    .navbar {
    display: flex;
    flex-direction: row;
    background: lightgray;
    padding: 1rem;
    border: solid gray 1px;
    font-weight: bold;
    }

    a:visited {
    text-decoration: none;
    }

    .navitem {
    margin: 0 0.5rem;
    }

    nav.ul {
    display: inline;
    }

    .wallet {
    padding: 1rem;
    }

    .warning {
    margin: 1rem, auto;
    color: red;
    text-align: left;
    }

    .mnemonic {
    font-family: monospace;
    background-color: lightyellow;
    padding: 2rem;
    border: dashed red 2px;
    margin: 2rem auto;
    text-align: center;
    font-size: large;
    }

    .swap {
    padding: 1rem;
    }
`;

export default GlobalStyle;
