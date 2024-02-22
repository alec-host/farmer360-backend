const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const {APP_SERVER_PORT} = require("../constants/constants");

const PORT = APP_SERVER_PORT;

const allowedOrigins = ['http://localhost:3000','https://68bf-197-232-61-197.ngrok-free.app/'];

const options = {
  origin: allowedOrigins
};


app.use(cors());
app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('uploads'));

//-.routes.
require("../routes/app.routes")(app);

module.exports = {
    app,
    PORT
};