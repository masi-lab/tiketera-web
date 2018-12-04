var Sticker = require("../models/sticker").Sticker;

class controlador_de_sticker
{
    /*
    async find_viejo(){
        let promise = new Promise((resolve, reject) => {
            Sticker.find(function(err, doc){
                if(err !== null){
                    resolve (err);
                }else{
                    resolve (doc);
                }
            });   
        });

        let result = await promise;
        return(result);
    }
    */

    static get_param(){
        let schemaKeys = Object.keys(Sticker.schema.paths);

        //delete schemaKeys["_id"];
        //delete schemaKeys["__v"];
        
        return schemaKeys;
    }

    async find(diccionario_datos){
        let resultado = await Sticker.find(diccionario_datos);
        return resultado;
    }

    async findOne(diccionario_datos){
        let resultado = await Sticker.findOne(diccionario_datos);
        return resultado;
    }

    async save(diccionario_datos){
        var sticker = new Sticker(diccionario_datos);
        let resultado = await sticker.save();
        return resultado;
    }

    async update(id_obj_to_update, diccionario_datos_a_actualizar){
        let resultado = await Sticker.findOne(id_obj_to_update);
        resultado = await resultado.update(diccionario_datos_a_actualizar);
        return resultado;
    }
}

/*
.then(
            function(us){
                return "Guardamos los datos";
            },
            function(err){
                if(err){
                    //console.log(String(err));
                    return ["No pudimos guardar los datos", err];
                }
        })
*/

module.exports.controlador_de_sticker = controlador_de_sticker;

/*

var user = new User({email: req.body.email, 
                        password: req.body.password,
                        username: req.body.username})
    /*user.save(function(err){
        res.send("Datos guardados");
    });*//*



*/