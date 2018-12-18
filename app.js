var express = require("express");
require('express-async-errors');
var bodyParse = require("body-parser");
//var router_sticker = require("./app/app/sticker/router/router");
const passport = require('passport');
//const pe = require('parse-error');
const cors = require('cors');
const router_app = express.Router();
const db = require('./config/DB')
var server = require('./tools/serverTools')
var app = express();

const not_route = require("./app/app/not_route/router/router");

//BodyParse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

// config variables
const CONFIG = require('./config/config.js');

//Passport
app.use(passport.initialize());

// CORS
app.use(cors());

//inicialize DB:
db.connectDB();

app.get("/", async function(req, res){
    res.send(`Nothing to do Here \nBut i have an Echoe for you:\nQuery: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}`);
})


//Routes index
const routes_index = require('./app/router/index.js');
app.use('/api/', routes_index(router_app));
app.use("/*", not_route);

app.listen(`${CONFIG.PORT}`, () => {
    console.log(`${server.tagGreen} ${CONFIG.APP_NAME} started at ${Date().toString().slice(0, 24)}\n${server.tagCyan} Listening on Port${CONFIG.PORT}`);
    console.log(`${server.tagWhite} Version: ${CONFIG.VERSION} Commit:${CONFIG.COMMIT} Environment: ${process.env.NODE_ENV} `)
  });
