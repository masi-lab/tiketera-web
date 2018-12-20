/*
Este middleware sirve para que cuando llega una peticion REQUEST se obtengan los valores del BODY, PARAM, etc que se quieren recuperar
*/
var models_control = require("../models_control/models_control").controlador_de_sticker;

function get_param(req, param, ignore_param){
    let data = {};

    if (param.length == 0){
        param = models_control.get_param();
    }

    for (let key of param){
        if(ignore_param.indexOf(key) == -1){
            if (req.query[key]){
                data[key] = req.query[key];
            }
        }
    }

    return data;
}

function post_body(req, param, ignore_param){
    let data = {};

    if (param.length == 0){
        param = models_control.get_param();
    }

    for (let key of param){
        if(ignore_param.indexOf(key) == -1){
            if (req.body[key]){
                data[key] = req.body[key];
            }
        }
    }

    return data;
}

module.exports = {
    find: function(req,res, next){
        
        let ignore_param = ["__v"];
        let param = []; // si esta vacio te busca todo los parametros q tenga la "TABLA"
        
        req.data = get_param(req, param, ignore_param);
        //console.log(data);
        
        next();
    },

    findOne: function(req,res, next){
        let ignore_param = ["__v"];
        let param = []; // si esta vacio te busca todo los parametros q tenga la "TABLA"

        req.data = get_param(req, param, ignore_param);

        //console.log(data);
        
        next();
    },

    deleteOne: function(req,res, next){
        let ignore_param = ["__v"];
        let param = ["_id"]; // si esta vacio te busca todo los parametros q tenga la "TABLA"

        req.data = get_param(req, param, ignore_param);

        //console.log(data);
        
        next();
    },

    update: function(req,res, next){
        let ignore_param = ["__v"];
        let param = []; // si esta vacio te busca todo los parametros q tenga la "TABLA"

        req.data = get_param(req, param, ignore_param);

        //console.log(data);
        
        next();
    },

    save: function(req,res, next){
        let ignore_param = ["_id", "__v"];
        let param = []; // si esta vacio te busca todo los parametros q tenga la "TABLA"

        req.data = post_body(req, param, ignore_param);

        //console.log(req.data);
        
        next();
    },

    print: function(req,res, next){
        let ignore_param = ["__v"];
        let param = ["_id", "quantity"]; // si esta vacio te busca todo los parametros q tenga la "TABLA"

        req.data = get_param(req, param, ignore_param);

        //console.log(req.data);
        
        next();
    },
}