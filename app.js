var express = require("express");
var bodyParse = require("body-parser");
//why router_sticker/router_sticker??
var router_sticker = require("./router_sticker/router_sticker");

var app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", async function(req, res){
    res.send(`Nothing to do Here \nBut i have an Echoe for you:\nQuery: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}`);
})

app.use("/sticker", router_sticker);

app.listen(8080);
