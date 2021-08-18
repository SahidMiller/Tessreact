/** @jsx h */
import { h } from "preact";
import Terminal from "./Terminal";
import createConsoleInterface from "./interfaces/createConsoleInterface";

export default {
  title: "Tess/Terminals",
  component: Terminal,
  argTypes: {},
};

const Template = (args) => (
  <div style="width:100%">
    <Terminal {...args} />
  </div>
);

export const SingleTerminal = Template.bind({});
SingleTerminal.args = {
  index: 0,
  active: true,
  dimensions: { columns: 175, rows: 65 },
  fontSize: "14",
  welcomeMessage: `Welcome to xterm.js
This is a local terminal emulation, without a real terminal in the back-end.
Type some keys and commands to play around.
`,
  pipe: (duplex, term) => {
    //TODO God willing: open blessed using some app or use with react live
    //TODO God willing: console interface is useful for custom commands, esp. built in with opts, God willing.
    //TODO God willing: still, repl is useful to use as well. TGIMA how to use together.
    createConsoleInterface(duplex, async (line, readlineConsole) => {});
  },
};
