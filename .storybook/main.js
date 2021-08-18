const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpackFinal: async (config, { configType }) => {
    return merge(config, {
      resolve: {
        alias: {
          execa: false,
        },
        fallback: {
          fs: path.resolve(__dirname, "./fs.js"),
          readline: require.resolve("node-stackify/readline"),
          child_process: false,
          //Not necessary to be exlicit (good to know it's in package.json and polyfilled)
          path: require.resolve("path"),
        },
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            include: path.resolve(__dirname, "../src"),
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  [
                    "@babel/plugin-transform-react-jsx",
                    {
                      pragma: "h",
                      pragmaFrag: "Fragment",
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      plugins: [
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
          process: path.resolve(__dirname, "./process.js"),
        }),
      ],
    });
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
};
