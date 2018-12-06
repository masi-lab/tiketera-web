var express = require("express");
var router_sticker = express.Router();
var bodyParse = require("body-parser");

var sticker_rules = require("../business_rules/rules");
var sticker_param_rules = require("../business_rules/rules_of_param");

router_sticker.use(bodyParse.json());
router_sticker.use(bodyParse.urlencoded({extended: true}));

//little errorhanler middleware
async function errorHandler(err, req ,res, next){
    //console.log(err.message);
    //console.log(err.name);
    let erro = {}

    erro["name"] = err.name; 
    erro["message"] = err.message; 
    erro["code"] = err.code; 

    let result = {
      data: req.data,
      error: erro
    }

    res.status(500).send(result);
  }

async function toSend(req, res, next){
    let result = {
        data: req.data,
        error: req.error
    }
    res.status(req.status).send(result);
    //console.log('pasamos por el ult midd');
}


//--------------------------------------------------------------------------------------------------------

router_sticker.get("/find", sticker_param_rules.find, sticker_rules.find);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/findOne", sticker_param_rules.findOne, sticker_rules.findOne);

//--------------------------------------------------------------------------------------------------------

router_sticker.post("/save",sticker_param_rules.save ,sticker_rules.save);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/update",sticker_param_rules.update, sticker_rules.update);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/print",sticker_param_rules.print, sticker_rules.print);

//--------------------------------------------------------------------------------------------------------

router_sticker.use(toSend);
router_sticker.use(errorHandler);

module.exports = router_sticker;