const process = require("process/browser");

window.process = process;
//TODO God willing: provide polyfills for requested bindings
process.binding = (lib) => {
  if (lib === "constants") {
    return require("constants-browserify");
  }

  if (lib === "natives") {
    return {};
  }
};
process.stdout = {
  columns: 65,
  prependListener: () => {},
  //TODO God willing: hook up with ui and devtools, God willing
  write: (msg) => {
    window.console.log(msg);
  },
};
process.stderr = {
  write: (msg) => {
    window.console.log(msg);
  },
};
process.stdin = {
  on: () => {},
};
process.exit = () => {};
process.hrtime = hrtime;
process.browser = true;
process.versions = { node: "14.15.1" };
process.memoryUsage = () => {
  return {
    rss: 28241920,
    heapTotal: 5308416,
    heapUsed: 3505880,
    external: 1633217,
    arrayBuffers: 337087,
  };
};

process.execArgv = [];
process.argv = ["yarn", "install", "--registry", "https://registry.npmjs.org"];
module.exports = process;
