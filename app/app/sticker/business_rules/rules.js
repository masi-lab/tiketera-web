/*
    Este middleware sirve para realizar la logica de negocio
*/
var models_control = require("../models_control/models_control").controlador_de_sticker;
var Custom_error = require("../../../tools/tools").Custom_error;
var Custom_error_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var fs = require('fs').promises;

module.exports = {
    update: async function (req, res, next){
        nuevo_stricker = new models_control();
        let id_obj = {_id: req.data._id};
        let dic_data_to_change = req.data;
        delete dic_data_to_change["_id"];

        //console.log(id_obj);
        //console.log(dic_data_to_change);

        let respuesta = await nuevo_stricker.update(id_obj, dic_data_to_change);
        console.log(respuesta);
        //res.send("updated");
        req.data = respuesta;
        req.status = 200;
        next();
    },

    save: async function (req, res, next){
        sticker = new models_control();
   
        //console.log(req.data);

        //throw new Custom_error("100", "name of error" ,"description of error");
        //throw new Custom_error_tag("100", "name of error" ,"description of error");

        let msg = await sticker.save(req.data);

        //res.send(msg);
        req.data = msg;
        req.status = 200;
        next();
    }, 

    find: async function(req, res, next){
        nuevo_stricker = new models_control();

        let respuesta = await nuevo_stricker.find(req.data);
        //console.log(data);
        //res.send(respuesta);

        req.data = respuesta;
        req.status = 200;
        next();
    },

    findOne: async function(req, res, next){
        nuevo_stricker = new models_control();
        //console.log(req.data);
        let respuesta = await nuevo_stricker.findOne(req.data);
        //console.log(respuesta);
        //res.send(respuesta);
        req.data = respuesta;
        req.status = 200;
        next();
    },
    
    print: async function(req, res, next){
        nuevo_stricker = new models_control();

        let id_obj = {_id: req.data._id};
        let quantity = req.data.quantity;
        quantity = Number(quantity);

        let respuesta = await nuevo_stricker.findOne(id_obj);
        //console.log(respuesta);

        //console.log(quantity);
        
        let dato = '%BTW% /AF=c:\\command\\plantilla.btw /D="%Trigger File Name%" /PRN="EasyCoder PD41 (203 dpi) - IPL" /R=3 /P /DD \n' + 
                    '%END%\n' +
                    'Numero,Descripcion\n' +
                    `${respuesta.codigo},${respuesta.descripcion}`
        
        for (let i=0; i < quantity; i++){
            await fs.writeFile(`NewInvoice/${respuesta.codigo}_${i}.dat`, dato).catch(err=>{
                throw new Custom_error("10", "error archivo", "error al intentar grabar")
            });    
        }
        

        req.data = respuesta;
        req.status = 200;
        next();
    }
}