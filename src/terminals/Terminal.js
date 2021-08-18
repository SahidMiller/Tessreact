import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

import Stream from "stream";

import { XTerm } from "./XTerminal.js";
import { WebLinksAddon } from "xterm-addon-web-links";
import { FitAddon } from "xterm-addon-fit";

import defaultColors from "./theme/color.js";
import defaultConfig from "./theme/config.js";
import mergeOptions from "merge-options";

import "xterm/css/xterm.css";
import "../../assets/tess.css";
import "@fortawesome/fontawesome-free/css/all.css";

function resize(fitAddon, terminal, duplex) {
  try {
    fitAddon.fit();
    const proposeDimensions = fitAddon.proposeDimensions();
    if (proposeDimensions) {
      const rows = proposeDimensions.rows;
      const columns = proposeDimensions.cols + 1;
      terminal.resize(columns, rows);

      if (duplex) {
        duplex.columns = columns;
        duplex.rows = rows;
        duplex.emit("resize");
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default function ({
  index,
  active,
  fontSize,
  program,
  pipe,
  welcomeMessage = "",
  onReady,
  colors = {},
  config = {},
}) {
  colors = mergeOptions(defaultColors, colors);
  config = mergeOptions(defaultConfig, config);
  if (program) {
    pipe = program;
  }

  const termRef = useRef(null);

  const [duplex, setDuplex] = useState(null);
  const [fitAddon, setFitAddon] = useState(null);
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    setFitAddon(new FitAddon());
  }, []);

  useEffect(() => {
    if (termRef.current && fitAddon) {
      termRef.current.loadAddon(fitAddon);
      fitAddon.fit();
    }
  }, [termRef, fitAddon]);

  useEffect(() => {
    if (!fitAddon || !termRef.current) {
      return;
    }

    const resizeCb = function () {
      resize(fitAddon, termRef.current, duplex);
    };

    window.addEventListener("resize", resizeCb);
    resizeCb();

    return () => {
      // document.removeEventListener("mouseup", finalizeTabOrder);
      // document.removeEventListener("mousemove", startChangeTabOrder);
      window.removeEventListener("resize", resizeCb);
    };
  }, [termRef, fitAddon, duplex]);

  useEffect(async () => {
    const term = (window.term = termRef.current);

    term.loadAddon(
      new WebLinksAddon(
        ("click",
        (e, url) => {
          shell.openExternal(url);
        })
      )
    );

    term.attachCustomKeyEventHandler((e) => {
      let o; //let o = ExecuteShortcut(e);
      //return o == undefined ? false : o;
      return true;
    });

    term.write(welcomeMessage + "\r\n");

    const duplex = new Stream.Duplex({
      write(chunk, encoding, next) {
        termRef.current.write(chunk);
        next(null, chunk);
      },
      read(size) {},
    });

    setDuplex(duplex);
    onReady && onReady(term, duplex);
  }, [termRef]);

  useEffect(() => {
    if (pipe && duplex) {
      pipe(duplex, termRef.current.xterm);
    }
  }, [duplex, pipe]);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    // const bgColor = new Color(
    //   colors.terminal.theme.background,
    //   config.transparencyValue / 100
    // );

    // let needTransparent =
    //   config.background == "transparent" ||
    //   config.background == "acrylic" ||
    //   config.background == "blurbehind"
    //     ? true
    //     : false;

    // if (needTransparent) {
    // colors.terminal.theme.background = bgColor.rgba;
    // root.style.setProperty(
    //   "--opacity",
    //   config.transparencyValue / 100 + 0.21
    // );
    // root.style.setProperty("--background", colors.terminal.theme.background);
    // colors.terminal.theme.background = "transparent";
    // } else

    if (config.background == "image") {
      // colors.terminal.theme.background = bgColor.rgba;
      // root.style.setProperty(
      //   "--opacity",
      //   config.transparencyValue / 100 + 0.21
      // );
      // root.style.setProperty(
      //   "--background-image",
      //   "url(" + config.imageLink + ")"
      // );
      // root.style.setProperty("--background", colors.terminal.theme.background);
      // root.style.setProperty("--blur", "blur(" + config.imageBlur + "px)");
      // colors.terminal.theme.background = "transparent";
    } else {
      root.style.setProperty("--background", colors.terminal.theme.background);
    }

    // colors.terminal.theme.background = "transparent";

    root.style.setProperty("--tab-panel-background", colors.app.topBar);
    root.style.setProperty("--tab-active-background", colors.app.tabActive);
    root.style.setProperty("--tab-inactive-background", colors.app.tabInactive);
    root.style.setProperty("--tab-text-color", colors.app.textColor);
    root.style.setProperty(
      "--tab-text-size",
      colors?.app?.text?.size ? colors?.app?.tab?.text?.size + "px " : "12px"
    );
    root.style.setProperty("--general-text-color", colors.app.textColor);
    root.style.setProperty("--tab-hover", colors.app.backgroundHover);

    body.style.color = colors.app.textColor;
  }, []);

  return (
    <XTerm
      ref={termRef}
      className={`terms terminal-${index} ${active ? "visible" : "hidden"}`}
      options={{
        theme: colors.terminal.theme,
        cursorStyle: config.cursorStyle,
        allowTransparency: true,
        fontSize: fontSize || config.terminalFontSize,
        cursorBlink: config.cursorBlink == "true",
        convertEol: true,
      }}
      onInput={(e) => duplex.push(e)}
      name={index}
    />
  );
}
