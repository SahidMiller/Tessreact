import process from "process";
import fs from "fs";
import "../assets/reactide.css";
import "../assets/reactide-new.css";

import "../assets/loading.css";
import "../assets/tess.css";

import "xterm/css/xterm.css";
import "@fortawesome/fontawesome-free/css/all.css";

window.process = process;
window.fs = fs;
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
