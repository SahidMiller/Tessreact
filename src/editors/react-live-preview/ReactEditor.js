import { h, Fragment } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import CodeEditor from "react-simple-code-editor";

export function useEditor({ getHighlighterProps, code = "" }) {
  return {
    value: code,
    highlight: (code) => (
      <Highlight
        {...getHighlighterProps({
          ...defaultProps,
          code,
          language: "jsx",
        })}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </>
        )}
      </Highlight>
    ),
  };
}

export function Editor({ getHighlighterProps, ...props }) {
  const editorProps = useEditor({ getHighlighterProps, code: props.code });

  return <CodeEditor {...editorProps} {...props} />;
}

Editor.defaultProps = {
  getHighlighterProps(props) {
    return props;
  },
  code: "",
};
