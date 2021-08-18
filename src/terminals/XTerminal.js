import { h, Component } from "preact";
import { Terminal } from "xterm";
const className = require("classnames");

export default class XTerm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFocused: false,
    };
  }

  applyAddon(addon) {
    Terminal.applyAddon(addon);
  }
  componentDidMount() {
    this.xterm = new Terminal(this.props.options);
    this.xterm.open(this.container);
    this.xterm.element.addEventListener(
      "focus",
      this.focusChanged.bind(this, true)
    );
    this.xterm.element.addEventListener(
      "blur",
      this.focusChanged.bind(this, false)
    );
    if (this.props.onContextMenu) {
      this.xterm.element.addEventListener(
        "contextmenu",
        this.onContextMenu.bind(this)
      );
    }

    if (this.props.onInput) {
      this.xterm.onData(this.onInput);
    }

    if (this.props.value) {
      this.xterm.write(this.props.value);
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this.xterm) {
      this.xterm.dispose();
      this.xterm = null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate', nextProps.hasOwnProperty('value'), nextProps.value != this.props.value);
    if (
      nextProps.hasOwnProperty("value") &&
      nextProps.value != this.props.value
    ) {
      if (this.xterm) {
        this.xterm.clear();
        setTimeout(() => {
          this.xterm.write(nextProps.value);
        }, 0);
      }
    }
    return false;
  }
  getTerminal() {
    return this.xterm;
  }
  write(data) {
    this.xterm && this.xterm.write(data);
  }
  writeln(data) {
    this.xterm && this.xterm.writeln(data);
  }
  focus() {
    if (this.xterm) {
      this.xterm.focus();
    }
  }
  focusChanged(focused) {
    this.setState({
      isFocused: focused,
    });
    this.props.onFocusChange && this.props.onFocusChange(focused);
  }
  onInput = (data) => {
    this.props.onInput && this.props.onInput(data);
  };
  attachCustomKeyEventHandler(handler) {
    this.xterm && this.xterm.attachCustomKeyEventHandler(handler);
  }
  resize(cols, rows) {
    this.xterm && this.xterm.resize(Math.round(cols), Math.round(rows));
  }
  setOption(key, value) {
    this.xterm && this.xterm.setOption(key, value);
  }
  loadAddon(addon) {
    this.xterm && this.xterm.loadAddon(addon);
  }
  refresh() {
    this.xterm && this.xterm.refresh(0, this.xterm.rows - 1);
  }

  onContextMenu(e) {
    this.props.onContextMenu && this.props.onContextMenu(e);
  }

  render() {
    const terminalClassName = className(
      "ReactXTerm",
      this.state.isFocused ? "ReactXTerm--focused" : null,
      this.props.className
    );
    return (
      <div
        ref={(ref) => (this.container = ref)}
        className={terminalClassName}
      />
    );
  }
}
export { Terminal, XTerm };
