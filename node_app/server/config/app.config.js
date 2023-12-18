const express = require("express");
const cors = require("cors");
const app = express();

const {APP_SERVER_PORT} = require("../constants/constants");

const PORT = APP_SERVER_PORT;


//app.use(cors({origin:['http://localhost:3000','https://ba93-197-232-61-218.ngrok-free.app']}));
app.use(cors({}));

app.use(express.json());

app.use(express.static('uploads'));

//-.routes.
require("../routes/app.routes")(app);

module.exports = {
    app,
    PORT
};