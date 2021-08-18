import { h, Fragment } from "react";
import { useState, useEffect } from "react";
import { Preview } from "./ReactPreview.js";
import { Editor } from "./ReactEditor.js";

import { transform, registerPlugin } from "@babel/standalone";
import transformReact from "@babel/plugin-transform-react-jsx";

registerPlugin("plugin-transform-react-jsx", transformReact);

export default function (props) {
  const [liveCode, setLiveCode] = useState(props.code);
  const [compiledCode, setCompiledCode] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    try {
      setCompiledCode(
        transform(liveCode, {
          presets: [["stage-0", { decoratorsLegacy: true }], "env"],
          plugins: [
            [
              "plugin-transform-react-jsx",
              {
                pragma: "h",
                pragmaFrag: "Fragment",
              },
            ],
          ],
        }).code
      );

      setError(null);
    } catch (err) {
      setError(err);
    }
  }, [liveCode]);

  return (
    <>
      <Editor code={liveCode} onValueChange={setLiveCode} />
      {err && <p>Error: {err.message}</p>}
      {!err && (
        <Preview code={compiledCode} onError={(err) => setError(err)}></Preview>
      )}
    </>
  );
}
