import { h, Fragment } from "react";
import { forwardRef } from "react";
import TextEditor from "./TextEditor";
import PropTypes from "prop-types";

const TextEditorPane = forwardRef((props, ref) => {
  const {
    appState,
    setActiveTab,
    closeTab,
    onEditorValueChange,
    cbOpenSimulator_Main,
    cbOpenSimulator_Ext,
    style,
  } = props;
  // const editorArr = [];
  // if (Object.keys(appState.openTabs).length > 0) {
  //   //console.log(appState.previousPaths[appState.previousPaths.length-1]);
  //   editorArr.push(
  //     <TextEditor
  //       path={appState.previousPaths[appState.previousPaths.length-1]}
  //       onValueChange={onEditorValueChange}
  //     />);
  // }

  return (
    <div style={"flex:auto;" + style}>
      {Object.keys(appState.openTabs).length > 0 && (
        <TextEditor
          path={appState.previousPaths[appState.previousPaths.length - 1]}
          onValueChange={onEditorValueChange}
          ref={ref}
        />
      )}
    </div>
  );
});

TextEditorPane.propTypes = {
  appState: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  closeTab: PropTypes.func.isRequired,
};

export default TextEditorPane;
