if (process.env.NODE_ENV === "production") {
  console.log("production");
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
