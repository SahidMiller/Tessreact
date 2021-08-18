import { h } from "react";
import CoreTextEditorPane from "./TextEditorPane";

import fs from "fs";
import TabContainer from "./TabContainer";
fs.writeFileSync("/salam.txt", "Salam World");
fs.mkdir("/lib");

export default {
  title: "Tess/Editors/TextEditor",
  component: CoreTextEditorPane,
  argTypes: {},
};

const Template = (args) => (
  <div style="height:100vh;">
    <TabContainer
      appState={args.appState}
      setActiveTab={() => {}}
    ></TabContainer>
    <CoreTextEditorPane style={"width:100%; height:100%;"} {...args} />
  </div>
);

export const TextEditor = Template.bind({});
TextEditor.args = {
  appState: {
    openTabs: {
      "/salam.txt": {
        name: "salam.txt",
      },
      "/salam2.txt": {
        name: "salam2.txt",
      },
    },
    previousPaths: ["/salam.txt"],
  },
};
