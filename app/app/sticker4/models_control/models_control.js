/*
  Esto es la comunicacion entre cualquier APP con la Base de datos, seria todas la acciones que se pueden realizar con la BD
*/
var Models = require("../models/sticker").Sticker4;

class controlador_de_sticker
{
    static get_param(){
        let schemaKeys = Object.keys(Models.schema.paths);
        
        return schemaKeys;
    }

    async find(diccionario_datos){
        let campos = "etiqueta numero_serie ubicacion fecha_alta numero_equipo ot modelo";
        let resultado = await Models.find(diccionario_datos).select(campos);
        return resultado;
    }

    async findOne(diccionario_datos){
        let campos = "etiqueta numero_serie ubicacion fecha_alta numero_equipo ot modelo";
        let resultado = await Models.findOne(diccionario_datos).select(campos);
        return resultado;
    }

    async save_print(diccionario_datos){
        var cant = diccionario_datos["quantity"];
        delete diccionario_datos["quantity"];
        var models = new Models(diccionario_datos);
        let resultado = await models.save();
        
        //console.log(cant);
        
        return [resultado, cant];
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