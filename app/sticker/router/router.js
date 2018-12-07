const express = require("express");
const router_sticker = express.Router();
const bodyParse = require("body-parser");
const control_logeo = require('passport').authenticate('jwt', {session:false});
const sticker_rules = require("../business_rules/rules");
const sticker_param_rules = require("../business_rules/rules_of_param");
const toSend = require("../../to_send_and_start_error/index.js").toSend;
const errorHandler = require("../../to_send_and_start_error/index.js").errorHandler;
const toSendError = require("../../to_send_and_start_error/index.js").toSendError;
require('../../passport/passport')();


router_sticker.use(bodyParse.json());
router_sticker.use(bodyParse.urlencoded({extended: true}));

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/find", sticker_param_rules.find, sticker_rules.find);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/findOne", sticker_param_rules.findOne, sticker_rules.findOne);

//--------------------------------------------------------------------------------------------------------

router_sticker.post("/save",sticker_param_rules.save ,sticker_rules.save);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/update", control_logeo, sticker_param_rules.update, sticker_rules.update);

//--------------------------------------------------------------------------------------------------------

router_sticker.get("/print",sticker_param_rules.print, sticker_rules.print);

//--------------------------------------------------------------------------------------------------------

router_sticker.use(toSend);
router_sticker.use(errorHandler);
router_sticker.use(toSendError);

module.exports = router_sticker;