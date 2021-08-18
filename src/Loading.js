import { h } from "react";

import "../assets/loading.css";
import logoUrl from "../assets/logo.svg";

export default function ({}) {
  return (
    <header class="App-header">
      <img src={logoUrl} class="App-logo" alt="logo" />
      <p>Loading Reactide..</p>
      <a
        class="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}
