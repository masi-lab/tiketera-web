/*
  Aca solo se colocan los procesos por los que debe pasar cada peticion en particular
  Ej: get("/", proceso_de_obtencion_de_parametros, logica_de_negocio, mandar_resultado)
*/

//const passport = require('passport');

// Iniciacion
const express = require("express");
const router_user = express.Router();

// Declaracion de middleware finales
const toSend = require("../../../generic_middleware/to_send_and_start_error/index.js").toSend;
const errorHandler = require("../../../generic_middleware/to_send_and_start_error/index.js").errorHandler;
const toSendError = require("../../../generic_middleware/to_send_and_start_error/index.js").toSendError;

const pag_not_found = require('../../../tools/tools').pag_not_found

//--------------------------------------------------------------------------------------------------------
function pag_not_found_Middleware(req, res, next) {
    throw new pag_not_found("404", "Pag not found");
  }

//--------------------------------------------------------------------------------------------------------
// Esto no serviria mas si se usaria GraphQL
//Middleware intermedios
router_user.get("/*", pag_not_found_Middleware);

//--------------------------------------------------------------------------------------------------------

//Middleware finales
router_user.use(toSend);
router_user.use(errorHandler);
router_user.use(toSendError);

//--------------------------------------------------------------------------------------------------------

module.exports = router_user;

