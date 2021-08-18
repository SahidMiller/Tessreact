import { h } from "preact";
import CoreLoading from "./Loading";

export default {
  title: "Tess/Loading",
  component: CoreLoading,
  argTypes: {},
};

const Template = (args) => (
  <div class="App">
    <CoreLoading></CoreLoading>
  </div>
);

export const Loading = Template.bind({});
Loading.args = {};
