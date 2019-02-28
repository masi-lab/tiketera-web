/*
  Aca solo se colocan los procesos por los que debe pasar cada peticion en particular
  Ej: get("/", proceso_de_obtencion_de_parametros, logica_de_negocio, mandar_resultado)
*/

// Iniciacion
const express = require("express");
const router_sticker = express.Router();
//const bodyParse = require("body-parser");

// Declaracion de middleware intermedios
const sticker_rules = require("../business_rules/rules");
const sticker_param_rules = require("../business_rules/rules_of_param");
// Declaracion de middleware finales
const toSend = require("../../../generic_middleware/to_send_and_start_error/index.js").toSend;
const errorHandler = require("../../../generic_middleware/to_send_and_start_error/index.js").errorHandler;
const toSendError = require("../../../generic_middleware/to_send_and_start_error/index.js").toSendError;


//router_sticker.use(bodyParse.json());
//router_sticker.use(bodyParse.urlencoded({extended: true}));

//--------------------------------------------------------------------------------------------------------

//Middleares intermedios
router_sticker.use('/*', sticker_rules.init_url); // Para controlar que si a futuro se usa una URL valida
//-------------------------------------------------
router_sticker.get("/find", sticker_rules.set_url, sticker_param_rules.find, sticker_rules.find);
router_sticker.get("/findOne", sticker_rules.set_url, sticker_param_rules.findOne, sticker_rules.findOne);
router_sticker.post("/save_print", sticker_rules.set_url, sticker_param_rules.save_print ,sticker_rules.save_print);
router_sticker.get("/print", sticker_rules.set_url, sticker_param_rules.print, sticker_rules.print);
router_sticker.get("/delete", sticker_rules.set_url, sticker_param_rules.deleteOne, sticker_rules.deleteOne);
//-------------------------------------------------
router_sticker.use('/*', sticker_rules.control_rout); // Se verifica si se uso una URL valida
//--------------------------------------------------------------------------------------------------------

//Middleware finales
router_sticker.use(toSend);
router_sticker.use(errorHandler);
router_sticker.use(toSendError);

module.exports = router_sticker;