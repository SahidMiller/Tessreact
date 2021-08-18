import { h, Fragment, Component, render } from "preact";
import {
  useEffect,
  useContext,
  useState,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "preact/hooks";

export function createRenderer(
  mountSelector = `[data-react-preview-editor="preview"]`
) {
  const state = { prevElement: undefined };
  return function _render(element) {
    render(element, document.querySelector(mountSelector), state.prevElement);
    state.prevElement = element;
  };
}

const defaultScope = {
  h: h,
  Fragment: Fragment,
  Component: Component,
  render: createRenderer(),
  useEffect,
  useContext,
  useState,
  useRef,
  useReducer,
  useMemo,
  useCallback,
};

export function usePreview({ code, scope = defaultScope, onError } = {}) {
  const resolvedScope = {
    ...scope,
    render: createRenderer(`[data-react-preview-editor="preview"]`),
  };
  useEffect(() => {
    const func = new Function(...Object.keys(resolvedScope), code);

    try {
      func(...Object.values(resolvedScope));
    } catch (err) {
      onError && onError(err);
    }
  }, [code, scope]);
}

export function Preview(props) {
  usePreview(props);
  return <div {...props} data-react-preview-editor="preview" />;
}
