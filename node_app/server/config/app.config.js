const express = require("express");
const cors = require("cors");
const app = express();

const {APP_SERVER_PORT} = require("../constants/constants");

const PORT = APP_SERVER_PORT;

const corsOptions = {
  origin: ["http://127.0.0.1:3000","https://8e7e-197-232-61-247.ngrok-free.app"]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static('uploads'));

//-.routes.
require("../routes/app.routes")(app);

module.exports = {
    app,
    PORT
};