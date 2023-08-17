const express = require("express");
const app = express();
let cors = require("cors");
const server = require("./src/db/connect");
require("dotenv");
const config = require("./src/config/config");
const homeRoute = require("./src/router/default");
const routes = require("./src/router/default");

server.connect();


app.use(cors());
app.use(express.json());
app.use("/",routes);
//app.use("/api",loginRoutes);
console.log("INDEX");
app.listen(config.PORT,(err,res)=>{
    if(err) throw err;
    console.log(`app is connecting to port ${config.PORT}`);
})