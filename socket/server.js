const express = require('express');
const dotenv = require('dotenv').config();
const socketHandler = require('./socket/socketHandler');
const http = require('http');
const app = express();

const cors = require("cors");

const httpServer = http.createServer(app);
socketHandler(httpServer);


const port = process.env.PORT || 5000;


app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
