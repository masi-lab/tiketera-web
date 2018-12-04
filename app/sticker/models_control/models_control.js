var Sticker = require("../models/sticker").Sticker;

class controlador_de_sticker
{
    static get_param(){
        let schemaKeys = Object.keys(Sticker.schema.paths);
        
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
        let resultado = await sticker.save()
        return resultado;
    }

    async update(id_obj_to_update, diccionario_datos_a_actualizar){
        let resultado = await Sticker.findOne(id_obj_to_update);
        resultado = await resultado.update(diccionario_datos_a_actualizar);
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