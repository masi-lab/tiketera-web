/*
  Esto es la comunicacion entre cualquier APP con la Base de datos, seria todas la acciones que se pueden realizar con la BD
*/

var Models = require("../models/users").Users;

class controlador_de_users
{
    static get_param(){
        let schemaKeys = Object.keys(Models.schema.paths);
        
        return schemaKeys;
    }

    async find(diccionario_datos){
        let resultado = await Models.find(diccionario_datos);
        return resultado;
    }

    async findOne(diccionario_datos){
        let resultado = await Models.findOne(diccionario_datos);
        return resultado;
    }

    async save(diccionario_datos){
        var models = new Models(diccionario_datos);
        let resultado = await models.save()
        return resultado;
    }

    async update(id_obj_to_update, diccionario_datos_a_actualizar){
        let resultado = await Models.findOne(id_obj_to_update);
        resultado = await resultado.update(diccionario_datos_a_actualizar);
        return resultado;
    }
}



module.exports.controlador_de_users = controlador_de_users;




























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