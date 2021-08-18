/** @jsx h */
import { h } from "preact";
import { default as CoreMultiTerminal } from "./MultiTerminal";
import createConsoleInterface from "./interfaces/createConsoleInterface";

export default {
  title: "Tess/Terminals",
  component: CoreMultiTerminal,
  argTypes: {},
};

const Template = (args) => (
  <div style="width:100%">
    <CoreMultiTerminal {...args} />
  </div>
);

export const MultiTerminal = Template.bind({});
MultiTerminal.args = {
  terminals: [
    {
      program: (duplex, term) => {
        //TODO God willing: open blessed using some app or use with react live
        //TODO God willing: console interface is useful for custom commands, esp. built in with opts, God willing.
        //TODO God willing: still, repl is useful to use as well. TGIMA how to use together.
        createConsoleInterface(duplex, async (line, readlineConsole) => {});
      },
      welcomeMessage: `Welcome to xterm.js
This is a local terminal emulation, without a real terminal in the back-end.
Type some keys and commands to play around.
`,
    },
  ],
};
