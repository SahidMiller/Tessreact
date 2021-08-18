import { h } from "react";
import MockComponentTree from "./RefreshComponentTreeButton";
import RefreshComponentTreeButton from "./RefreshComponentTreeButton";

export default function ({ constructComponentTreeObj, componentTreeObj }) {
  return (
    <div className="item-views">
      <div className="styleguide pane-item">
        <header className="styleguide-header">
          <div id="comptree-titlebar-left">
            <h5>Component Tree</h5>
          </div>
          <div id="comptree-titlebar-right">
            {componentTreeObj && (
              <RefreshComponentTreeButton
                constructComponentTreeObj={constructComponentTreeObj}
              />
            )}
          </div>
        </header>
        <main className="styleguide-sections">
          {componentTreeObj && (
            <MockComponentTree componentTreeObj={componentTreeObj} />
          )}
        </main>
      </div>
    </div>
  );
}
