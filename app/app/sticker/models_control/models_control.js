/*
  Esto es la comunicacion entre cualquier APP con la Base de datos, seria todas la acciones que se pueden realizar con la BD
*/
var Models = require("../models/sticker").Sticker;

class controlador_de_sticker
{
    static get_param(){
        let schemaKeys = Object.keys(Models.schema.paths);
        
        return schemaKeys;
    }

    async find(diccionario_datos){
        let campos = "codigo descripcion";
        let resultado = await Models.find(diccionario_datos).select(campos);
        return resultado;
    }

    async findOne(diccionario_datos){
        let campos = "codigo descripcion";
        let resultado = await Models.findOne(diccionario_datos).select(campos);
        return resultado;
    }

    async save(diccionario_datos){
        var models = new Models(diccionario_datos);
        let resultado = await models.save();
        return resultado;
    }

    async update(id_obj_to_update, diccionario_datos_a_actualizar){
        let resultado = await Models.findOne(id_obj_to_update);
        resultado = await resultado.update(diccionario_datos_a_actualizar);
        return resultado;
    }

    async deleteOne(diccionario_datos){
        //console.log(diccionario_datos)
        let resultado = await Models.delete({_id:diccionario_datos["_id"]});
        //let resultado = await Models.findDeleted(diccionario_datos);
        //console.log(resultado);
        return resultado;
    }
}



module.exports.controlador_de_sticker = controlador_de_sticker;




























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