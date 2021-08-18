import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import Terminal from "./Terminal.js";
import Editor from "../editors/react-live-preview/index.js";
import "../../assets/tess.css";

const code = `
  function App() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>update count {count}</button>
  };
  render(<App />);`;

import { colors } from "./util.js";

export default function MultiTerminal({ terminals = [], openEditor = false }) {
  let defaultActiveIndex = terminals.findIndex((t) => t.active);
  defaultActiveIndex =
    !terminals.length || defaultActiveIndex !== -1 ? defaultActiveIndex : 0;

  const terminalsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  const [isDragging, setIsDragging] = useState(null);

  useEffect(() => {
    const finalizeTabOrder = () => {
      changeTabOrder(tab, tab_link);
    };

    const startChangeTabOrder = (e) => {
      if (tab.getAttribute("mousedown") == "true") {
        if (
          tab.getAttribute("dragged") != "true" &&
          Math.abs(e.clientX - Number(tab.getAttribute("startDragX"))) > 15
        ) {
          tab.setAttribute("dragged", "true");
        }

        if (tab.getAttribute("dragged") == "true") {
          tab.classList.add("overAll");
          tab.style.transform = `translateX(${
            e.clientX - Number(tab.getAttribute("startDragX"))
          }px)`;

          let a = e.clientX - Number(tab.getAttribute("startDragX"));
          let b = tab.getBoundingClientRect().width;
          tabOrderToAdd = Math.round(a / b);

          tab.setAttribute("orderToAdd", tabOrderToAdd);
        }
      }
    };

    // document.addEventListener("mouseup", finalizeTabOrder);
    // document.addEventListener("mousemove", startChangeTabOrder);
  }, []);

  return (
    <>
      <div class="multiterminal tabs">
        <div class="tabs-panel">
          <div class="tabs-tab" id="test">
            {terminals.map((terminal, index) => (
              <div
                className={`tab tab-all-${index} tab-active`}
                index={index + 1}
                style={`order: {index + 1}; background: ${colors?.app?.tab_background}`}
                onMouseUp={() => {
                  // changeTabOrder(tab, tab_link);
                }}
                onMouseDown={(e) => {
                  // const tab = e.target;
                  // tab.setAttribute("mousedown", "true");
                  // tab.setAttribute("startDragX", `${e.clientX}`);
                  // tab.setAttribute("dragged", "false");
                  // tabOrderToAdd = 0;
                  //focusTerm(tab_link.classList[2], tab);
                }}
                onAnimationStart={() => {
                  //focusTerm(tab_link.classList[2], tab);
                }}
              >
                <img
                  className="logo"
                  src={terminal.icon || require("../../assets/shell.png")}
                  onClick={() => {
                    //focusTerm(tab_link.classList[2], tab);
                  }}
                ></img>
                <div
                  className={`tab-link tab-${index} ${index}`}
                  onMouseUp={() => {
                    // changeTabOrder(tab, tab_link);
                  }}
                  onClick={() => {
                    // changeTabOrder(tab, tab_link);
                  }}
                  onMouseDown={(e) => {
                    // tab.setAttribute("mousedown", "true");
                    // tab.setAttribute("startDragX", `${e.clientX}`);
                    // tab.setAttribute("dragged", "false");
                    // tabOrderToAdd = 0;
                    //focusTerm(tab_link.classList[2], tab);
                  }}
                >
                  {terminal.name || "Shell"}
                </div>
                <div
                  className={`close-button`}
                  close-button-number={index}
                  onClick={() => {
                    if (t.type == "Page") {
                      Close(close_button.getAttribute("close-button-number"));
                    } else {
                      ipc.send(
                        "close-terminal",
                        close_button.getAttribute("close-button-number")
                      );
                    }

                    let tabs = document.querySelectorAll(".tab");
                    let indexList = [];
                    tabs.forEach((el) => {
                      indexList.push(Number(el.getAttribute("index")));
                    });

                    maxIndex = Math.max(...indexList);
                  }}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))}
            <div class="more end-order" id="new-tab">
              +
            </div>
            <div class="more end-order" id="show-all-shell">
              ↓
            </div>
          </div>
        </div>
        <div class="app-buttons">
          <div class="app-button" id="close" title="Close">
            ❌
          </div>
          <div class="app-button" id="screen-size" title="Magnify">
            🔎
          </div>
        </div>
      </div>
      <div class="terminals-before">
        <div class="terminals" id="terminals" ref={terminalsRef}>
          {openEditor && <Editor code={code} />}
          {terminals.map((terminal, index) => (
            <Terminal
              index={index}
              active={!openEditor && index === activeIndex}
              program={terminal.program}
              welcomeMessage={terminal.welcomeMessage}
            ></Terminal>
          ))}
        </div>
      </div>
    </>
  );
}

function changeTabOrder(tab, tab_link) {
  tab.setAttribute("mousedown", "false");
  tab_link.setAttribute("mousedown", "false");
  tab.style.transform = "translateX(0px)";
  tab.classList.remove("overAll");

  if (tabOrderToAdd) {
    tab.setAttribute("dragged", "false");

    if (tabOrderToAdd > 0) {
      for (let index = tabOrderToAdd; index != 0; index--) {
        let nextTab = null;
        let i = 1;
        while (nextTab == null && i <= maxIndex) {
          nextTab = document.querySelector(
            ".tab[index='" +
              Number(Number(tab.getAttribute("index")) + i) +
              "']"
          );
          i++;
        }

        let allTab = document.querySelectorAll(".tab");

        tab.setAttribute("index", nextTab.getAttribute("index"));
        nextTab.setAttribute("index", Number(tab.getAttribute("index")) - 1);

        allTab.forEach((el) => {
          el.style.order = el.getAttribute("index");
        });
      }
    } else {
      for (let index = tabOrderToAdd; index != 0; index++) {
        let nextTab = null;
        let i = 1;

        while (nextTab == null) {
          nextTab = document.querySelector(
            ".tab[index='" +
              Number(Number(tab.getAttribute("index")) - i++) +
              "']"
          );
        }

        let allTab = document.querySelectorAll(".tab");

        tab.setAttribute("index", nextTab.getAttribute("index"));
        nextTab.setAttribute("index", Number(tab.getAttribute("index")) + 1);

        allTab.forEach((el) => {
          el.style.order = el.getAttribute("index");
        });
      }
    }
  }
  tabOrderToAdd = 0;
}
