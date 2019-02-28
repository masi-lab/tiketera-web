/*
    Este middleware sirve para realizar la logica de negocio
*/
var models_control = require("../models_control/models_control").controlador_de_sticker;
var Custom_error = require("../../../tools/tools").Custom_error;
var Custom_error_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var fs = require('fs').promises;
const pag_not_found = require('../../../tools/tools').pag_not_found;

const depurar_nombre_archivo = require('../../../tools/tools').depurar_nombre_archivo;
const depurar_dato = require('../../../tools/tools').depurar_dato;



var self = module.exports = {
    save_print: async function (req, res, next){
        sticker = new models_control();

        let msg = await sticker.save_print(req.data);

        var cant = msg[1];
        var msg_resultado = msg[0];
        var id = msg_resultado._id;

        nuevo_stricker = new models_control();

        let respuesta = await nuevo_stricker.findOne(id);

        var nombre = respuesta.nombre;
        var descripcion = respuesta.descripcion;
        self.print_local(descripcion, descripcion, cant);

        req.data = msg_resultado;
        req.status = 200;
        next();
    }, 

    find: async function(req, res, next){
        nuevo_stricker = new models_control();
 
        for(data in req.data){
            if(data != '_id'){
                req.data[data] = {$regex: req.data[data]};
            }
        }

        let respuesta = await nuevo_stricker.find(req.data);

        req.data = respuesta;
        req.status = 200;
        next();
    },

    findOne: async function(req, res, next){
        nuevo_stricker = new models_control()
        
        for(data in req.data){
            if(data != '_id'){
                req.data[data] = {$regex: req.data[data]};
            }
        }

        let respuesta = await nuevo_stricker.findOne(req.data);
        req.data = respuesta;
        req.status = 200;
        next();
    },

    deleteOne: async function(req, res, next){
        nuevo_stricker = new models_control();
        let respuesta = await nuevo_stricker.deleteOne(req.data);
        req.data = respuesta;
        req.status = 200;
        next();
    },
    
    print: async function(req, res, next){
      
        self.print_local(req.data.descripcion, req.data.descripcion, req.data.quantity);

        req.data ={
            "descripcion": req.data.descripcion,
            "quantity": req.data.quantity
        };
        req.status = 200;
        next();
    },

     // Middleware para control de rutas
    init_url: async (req, res, next) => {
        req.url_vilida = false;
        next();
    },
     // Middleware para control de rutas
     set_url: async (req, res, next) => {
        req.url_vilida = true;
        next();
    },
     // Middleware para control de rutas
     control_rout: async (req, res, next) => {
        if(!req.url_vilida){
            throw new pag_not_found('404', 'pag not fuond');
        }
        next();
    },
    print_local: async (nombre, descripcion, cant) => {
        nombre = depurar_dato(descripcion);
        descripcion = depurar_dato(descripcion);
        var nombre_archivo = depurar_nombre_archivo(descripcion);
    
        
        let dato = '%BTW% /AF=c:\\command\\plantilla_marcos.btw /D="%Trigger File Name%" /PRN="EasyCoder PD41 (203 dpi) - IPL" /R=3 /P /DD \n' + 
                    '%END%\n' +
                    'Numero,Descripcion\n' +
                    `${descripcion}`
        
        for (let i=0; i < cant; i++){
            await fs.writeFile(`NewInvoice/${nombre_archivo}_${i}.dat`, dato).catch(err=>{
                throw new Custom_error("10", "error archivo", "error al intentar grabar")
            });    
        }
    },
}