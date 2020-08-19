const express = require("express");
const Config = require("config");
const app = express();
const PORT = Config.get("App.webserver.port");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const opn = require("opn");

const Logger = require("./logger");
const logger = new Logger("CRM");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.connect(Config.get("MongoDB.connectionString"));
mongoose.connection.once("open", () => logger.log("Connected to DB!"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("front-end"));

// Loading routes
require("./company/company.routes")(app);

app.listen(PORT, () => {
  logger.verbose(
    `Server ${process.env.NODE_ENV || "development"} listening on port ${PORT}`
  );
  logger.verbose(
    `visit the following url ${logger.COLOR.FgBlue}http://localhost:${PORT}`
  );
  opn(`http://localhost:${PORT}`);
});
