export default {
  theme: "default",
  background: "full",
  cursorStyle: "block",
  transparencyValue: "100",
  imageBlur: "0",
  imageLink: "",
  plugin: [],
  shortcut: [
    { id: 1, action: "Default Shell", control: "CTRL + T" },
    { id: 2, action: "Config", control: "CTRL + P" },
    { id: 3, action: "Paste", control: "CTRL + V" },
    { id: 6, action: "Esc", control: "CTRL + C" },
    { id: 12, action: "Close", control: "CTRL + W" },
  ],
  profil: [
    {
      id: 1,
      programm: "sh -c $SHELL",
      name: "Default Shell",
      icon: "",
    },
  ],
  defaultProfil: "Default Shell",
  terminalFontSize: "15",
};
