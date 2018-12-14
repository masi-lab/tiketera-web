/*
  Aca solo se colocan los procesos por los que debe pasar cada peticion en particular
  Ej: get("/", proceso_de_obtencion_de_parametros, logica_de_negocio, mandar_resultado)
*/

//const passport = require('passport');

// Iniciacion
const express = require("express");
const router_user = express.Router();

// Declaracion de GraphQL
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// Declaracion de middleware intermedios
const passport = require('passport');
let control_logeo = passport.authenticate(['bearer', 'guest'], { session: false })
const controller = require('../business_rules/users');
const users_param_rules = require("../business_rules/rules_of_param");
// Declaracion de middleware finales
const toSend = require("../../../generic_middleware/to_send_and_start_error/index.js").toSend;
const errorHandler = require("../../../generic_middleware/to_send_and_start_error/index.js").errorHandler;
const toSendError = require("../../../generic_middleware/to_send_and_start_error/index.js").toSendError;

// GraphQL schema
var schema = buildSchema(`
    type Query {
        get_User(username: String, password: String): Data_user
    },
    type Data_user{
        token: String
        message: String
        user: User
        error: Error
    },
    type User {
        id: String
        username: String
    },
    type Error {
        name: String
        message: String
        code: String
    }
`);

// Esto reemplazaria los middleware
var getUser = async function(args) { 
    //console.log(args);
    let respuesta = {};
    
    try {
        respuesta  = await controller.login2(args);    
    } catch (error) {
        respuesta.error = error.getError()
    }
    
    console.log(respuesta);
    return respuesta;
};

var root = {
    get_User: getUser,
};



//--------------------------------------------------------------------------------------------------------
//Middleware GrapshQL

router_user.use('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: false
}));



//--------------------------------------------------------------------------------------------------------
// Esto no serviria mas si se usaria GraphQL
//Middleware intermedios
//router_user.post("/add", users_param_rules.find, controller.add);
//router_user.get("/", control_logeo, controller.getMe);
//router_user.get("/logear", users_param_rules.find, controller.login);

//--------------------------------------------------------------------------------------------------------
/*
// Esto no serviria mas si se usaria GraphQL
//Middleware finales
router_user.use(toSend);
router_user.use(errorHandler);
router_user.use(toSendError);
*/
//--------------------------------------------------------------------------------------------------------

module.exports = router_user;

