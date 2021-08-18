import { h } from "react";
import CoreApp from "./App.js";

import reducer from "./store/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducer);

import fs from "fs";
fs.writeFile("/salam.txt", "Salam World");
fs.mkdir("/lib");

export default {
  title: "Tess/App",
  component: App,
  argTypes: {},
};

const Template = (args) => (
  <Provider store={store}>
    <CoreApp style={"width:100%; height:100%; position:absolute"} {...args} />
  </Provider>
);

export const App = Template.bind({});
App.args = {};
