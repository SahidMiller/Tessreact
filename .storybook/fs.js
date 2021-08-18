const fs = require("virtualfs").default;

Object.getOwnPropertyNames(Object.getPrototypeOf(fs)).map((key) => {
  if (fs[key] instanceof Function && key !== "constructor")
    fs[key] = fs[key].bind(fs);
});

module.exports = fs;
