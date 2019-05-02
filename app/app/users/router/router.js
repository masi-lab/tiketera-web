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

// Declaraciones de errores
const AuthError = require('../../../tools/tools').AuthError

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
var getUser = async function(args, req) { 
    // HERE WE CAUGHT THE USER n REQ
    //console.log(`Logeado como: ${req.user.username}`);
    
    //throw new AuthError("000", "Este modulo no acepta user INVITADO");

    //console.log(req.registro_de_autorizacion);
    
    let respuesta = {};
    //respuesta  = await controller.login2(args);   

    //console.log(respuesta);
    return respuesta;
};

var  root = {
    get_User: getUser,
};

//--------------------------------------------------------------------------------------------------------

router_user.use(control_logeo);

router_user.use('/*', controller.control_rout);

//--------------------------------------------------------------------------------------------------------
//Middleware GrapshQL

router_user.use('/', express_graphql((req, res, next) => ({
    schema: schema,
    rootValue: root,
    graphiql: false,
    formatError: (err) => {

        //res.send(err.originalError.getError())

        let errors = []
        
        //console.log(err);

        //errors.push(err.originalError.getError())
        errors.push(err);

        let result = {
            success: false,
            //data: req.data,
            error: errors
        }
    
        req.result = result;

        next()
    }
})));

//--------------------------------------------------------------------------------------------------------
// Esto no serviria mas si se usaria GraphQL
//Middleware intermedios
//router_user.post("/add", users_param_rules.find, controller.add);
//router_user.get("/", control_logeo, controller.getMe);
//router_user.get("/logear", users_param_rules.find, controller.login);

//--------------------------------------------------------------------------------------------------------

//Middleware finales
router_user.use(toSend);
router_user.use(errorHandler);
router_user.use(toSendError);

//--------------------------------------------------------------------------------------------------------

module.exports = router_user;
