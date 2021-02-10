//module.exports = app

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { NODE_ENV } = require("./config");
const winston = require("winston");
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const { domain } = require("process");
const routes = require("./routes");
console.log("env", process.env);

/* -------------------------------------------------------- */
/*                 Express setup                            */
/* -------------------------------------------------------- */
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* -------------------------------------------------------- */
/*                 Winston setup                            */
/* -------------------------------------------------------- */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "info.log" })],
});

if (NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

/* -------------------------------------------------------- */
/*              Morgan & other setup                        */
/* -------------------------------------------------------- */
//NODE_ENV is a Node env variable. It determines if the app
//is running in production or some other env. When we deploy
//Heroku sets this env variable to a value of "production".
//We can check to see if the NODE_ENV is set to "production"
//or not, and set the value for morgan as appropriate.
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(helmet());

/* -------------------------------------------------------- */
/*                        CORS                              */
/* -------------------------------------------------------- */
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
//app.use(cors());

/* -------------------------------------------------------- */
/*                        USE                               */
/* -------------------------------------------------------- */
//app.use('/api/folders', foldersRouter)

/* -------------------------------------------------------- */
/*                        GET                               */
/* -------------------------------------------------------- */
app.get("/", (req, res) => {
  res.send("Hello World!");
  res.status(200);
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.use("/api", routes);

/* -------------------------------------------------------- */
/*                    ERROR HANDLER                         */
/* -------------------------------------------------------- */
app.use(function errorHandler(error, req, res, next) {
  let response;
  //if (process.env.NODE_ENV === 'production') {
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

/* -------------------------------------------------------- */
/*                    GOOGLE VISION                         */
/* -------------------------------------------------------- */
/*
app.post("/tag-image", async (req, res) => {
  console.log("body", req.body);

  // Performs label detection on the gcs file
  const [result] = await client.labelDetection(
    "https://images-assets.nasa.gov/image/PIA01319/PIA01319~thumb.jpg"
  );
  const labels = result.labelAnnotations;
  console.log("Labels:");
  labels.forEach((label) => console.log(label.description));
  res.send(req.body);
});
*/

/* -------------------------------------------------------- */
/*                      EXPORT                              */
/* -------------------------------------------------------- */
module.exports = app;
