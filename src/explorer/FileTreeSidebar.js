import { h } from "react";
import FileTree from "./FileTree";
import RefreshFileDirectory from "./RefreshFileDirectory";

export default function ({
  updateFileDirectory,
  openMenuId,
  createMenuInfo,
  fileTree,
  selectedItem,
  renameFlag,
  dblClickHandler,
  openCreateMenu,
  createMenuHandler,
  createItem,
  clickHandler,
  renameHandler,
}) {
  return (
    <div className="item-views">
      <header className="styleguide-header">
        <h5>File Directory</h5>

        <div id="comptree-titlebar-right">
          {fileTree && (
            <RefreshFileDirectory updateFileDirectory={updateFileDirectory} />
          )}
        </div>
      </header>
      <main className="styleguide-sections">
        {fileTree && (
          <FileTree
            dblClickHandler={dblClickHandler}
            openCreateMenu={openCreateMenu}
            openMenuId={openMenuId}
            createMenuInfo={createMenuInfo}
            createMenuHandler={createMenuHandler}
            createItem={createItem}
            fileTree={fileTree}
            selectedItem={selectedItem}
            clickHandler={clickHandler}
            renameFlag={renameFlag}
            renameHandler={renameHandler}
          />
        )}
      </main>
    </div>
  );
}
