/*
  Esto es la comunicacion entre cualquier APP con la Base de datos, seria todas la acciones que se pueden realizar con la BD
*/

var Models = require("../models/users").Users;

module.exports.controlador_de_users =
{
    get_param: async ()=>{
        let schemaKeys = Object.keys(Models.schema.paths);
        return schemaKeys;
    },

    find: async (diccionario_datos)=>{
        let resultado = await Models.find(diccionario_datos);
        return resultado;
    },

    findOne: async (diccionario_datos) => {
        let resultado = await Models.findOne(diccionario_datos);
        delete resultado.__v;
        return resultado;
    },

    save: async (diccionario_datos)=> {
        var models = new Models(diccionario_datos);
        let resultado = await models.save()
        return resultado;
    },

    update: async (id_obj_to_update, diccionario_datos_a_actualizar) => {
        let resultado = await Models.findOne(id_obj_to_update);
        resultado = await resultado.update(diccionario_datos_a_actualizar);
        return resultado;
    },

    findById: async function (id) {
        let resultado = await Models.findById(id);
        return resultado;
    },

    toWeb: async (id) => {
        let user = await module.exports.controlador_de_users.findById(id);
        return await user.toWeb(id);
    },

    getJWT: async (id) => {
        let user = await module.exports.controlador_de_users.findById(id);
        return user.findById(id);
    },
}





























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