const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys.js");
const app = express();
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport.js");
require("./models/Survey");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //  If a request comes in for any route that we don't have covered in the server, look in client/build and look for the file located at that route.
  app.use(express.static("client/build"));

  //Express will serve up the index.html file if it doesn't recognize the route.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Listening in on port:", PORT);
