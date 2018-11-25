const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressServer = express();
const http = require("http");
const router = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
    'mongodb://localhost/advanced_react',
    {
        useNewUrlParser: true
    }
);

mongoose.set('useCreateIndex', true);

mongoose.connection
    .once("open", () => console.log('Connected'))
    .on ("error", error => console.log(`Error connection : ${error}`))

expressServer.use(morgan("combined")); 
expressServer.use(bodyParser.json({
    type: '*/*'
}));
expressServer.use(cors());

const port = 3002;
const server = http.createServer(expressServer);

router(expressServer);

server.listen(port);
console.log(`Listening on port : ${port}`);