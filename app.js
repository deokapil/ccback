const Express = require("express");
const Dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const DB = require("./models/db");

const consentRoute = require("./routes/cookieconsent");

let app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 4000;

app.post("/users", (req, res) => {
  res.send("tesstog");
});

module.exports = app;

app.use("/api", consentRoute);
app.use(Express.static(__dirname + "/public"));
app.listen(port, () => {
  console.log("server is listening on port " + port);
});
