import { createInterface } from "readline";

export default function createConsoleInterface(duplex, onLine) {
  const consoleInterface = createInterface({
    //Readable (so push to it)
    input: duplex,
    //Writeable by the other side, God willing.
    output: duplex,
    terminal: true,
    prompt: "$ ",
  });

  consoleInterface.prompt();

  consoleInterface.on("line", async (input) => {
    consoleInterface.prompt();
    onLine && onLine(input.trim(), consoleInterface);
  });

  //TODO God willing: close handlers
  return consoleInterface;
}
