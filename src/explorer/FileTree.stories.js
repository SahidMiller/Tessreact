import { h, Fragment, Component } from "react";
import { default as CoreFileTree } from "./FileTree";
import RefreshFileDirectory from "./RefreshFileDirectory";

export default {
  title: "Tess/Explorers/FileTree",
  component: CoreFileTree,
  argTypes: {},
};

const Template = (args) => {
  return (
    <ride-pane style={{ flexGrow: 0, flexBasis: 275 }}>
      <div className="item-views">
        <div
          className="styleguide pane-item"
          style="color: rgb(155, 164, 181);background-color: #292e38;"
        >
          <header className="styleguide-header">
            <h5>File Directory</h5>

            <div id="comptree-titlebar-right">
              <RefreshFileDirectory />
            </div>
          </header>
          <main className="styleguide-sections">
            {<CoreFileTree {...args} />}
          </main>
        </div>
      </div>
    </ride-pane>
  );
};

export const FileTree = Template.bind({});
FileTree.args = {
  fileTree: {
    id: 0,
    path: "/",
    name: "Test",
    subdirectories: [
      { id: 1, name: "Salam", path: "/test", subdirectories: [], files: [] },
    ],
    files: [],
    opened: true,
  },
  createMenuInfo: {},
  selectedItem: {},
};
