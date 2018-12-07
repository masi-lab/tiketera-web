var express = require("express");
require('express-async-errors');
var bodyParse = require("body-parser");
//var router_sticker = require("./app/app/sticker/router/router");
const passport = require('passport');
//const pe = require('parse-error');
const cors = require('cors');
const router_app = express.Router();

var app = express();

//BodyParse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

//Passport
app.use(passport.initialize());

// CORS
app.use(cors());

app.get("/", async function(req, res){
    res.send(`Nothing to do Here \nBut i have an Echoe for you:\nQuery: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}`);
})


//Routes index
const routes_index = require('./app/router/index.js');
app.use('/api/', routes_index(router_app));

app.listen(8080);
