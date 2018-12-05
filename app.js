var express = require("express");
require('express-async-errors');
var bodyParse = require("body-parser");
var router_sticker = require("./app/sticker/router/router");

var app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", async function(req, res){
    res.send(`Nothing to do Here \nBut i have an Echoe for you:\nQuery: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}`);
})

app.use("/sticker", router_sticker);

app.listen(8080);
