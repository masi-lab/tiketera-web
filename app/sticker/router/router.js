var express = require("express");
var router_sticker = express.Router();
var bodyParse = require("body-parser");

var sticker_rules = require("../business_rules/rules");

router_sticker.use(bodyParse.json());
router_sticker.use(bodyParse.urlencoded({extended: true}));

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/find", sticker_rules.find);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/findOne", sticker_rules.findOne);

//--------------------------------------------------------------------------------------------------------

router_sticker.post("/save",sticker_rules.save);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/update", sticker_rules.update);

//--------------------------------------------------------------------------------------------------------

module.exports = router_sticker;