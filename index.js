require("dotenv").config({ debug: true });
const express = require("express");
const authRouter = require("./routes/auth.routes");
const {handleError} = require("./middlewares/error-handler.middleware");
const db = require("./db");

const server = express();
const port = 5000;

server.use(express.json());

server.get("/", (req, res) => {
  res.json("hi");
});
server.use("/auth", authRouter);

server.use(handleError); 

db.createDbConnect(function createServer(e) {
  if (e) throw e;
  server.listen(port, function (err) {
    if (err) throw err;
    console.log("listening on port", port);
  });
});
