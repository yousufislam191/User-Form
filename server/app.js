const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/db");

const userRouter = require("./routes/users.routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", userRouter);

// app.get("/", (req, res) => {
//   res.status(200).sendFile(__dirname + "/views/index.html");
// });
app.use((req, res, next) => {
  res.status(404).send("Page not found");
  res.end();
});
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("Server error !!!");
    }
  }
});

module.exports = app;
