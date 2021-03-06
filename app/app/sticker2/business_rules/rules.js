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
   
        //console.log(req.data);

        //throw new Custom_error("100", "name of error" ,"description of error");
        //throw new Custom_error_tag("100", "name of error" ,"description of error");

        let msg = await sticker.save_print(req.data);

        var cant = msg[1];
        var msg_resultado = msg[0];
        var id = msg_resultado._id;

        nuevo_stricker = new models_control();

        let respuesta = await nuevo_stricker.findOne(id);
        //console.log(respuesta);
        var nombre = respuesta.nombre;
        var descripcion = respuesta.descripcion;
        self.print_local(nombre, descripcion, cant);

        req.data = msg_resultado;
        req.status = 200;
        next();
    }, 

    find: async function(req, res, next){
        nuevo_stricker = new models_control();
 
        //console.log(req.data) 
        for(data in req.data){
            if(data != '_id'){
                req.data[data] = {$regex: req.data[data]};
            }
        }
        //console.log(req.data) 

        let respuesta = await nuevo_stricker.find(req.data);
        //console.log(data);
        //res.send(respuesta);

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

        //console.log(req.data);
        let respuesta = await nuevo_stricker.findOne(req.data);
        //console.log(respuesta);
        //res.send(respuesta);
        req.data = respuesta;
        req.status = 200;
        next();
    },

    deleteOne: async function(req, res, next){
        nuevo_stricker = new models_control();
        //console.log(req.data);
        let respuesta = await nuevo_stricker.deleteOne(req.data);
        //console.log(respuesta);
        req.data = respuesta;
        req.status = 200;
        next();
    },
    
    print: async function(req, res, next){
        self.print_local(req.data.nombre, req.data.descripcion, req.data.quantity);

        req.data ={
            "nombre": req.data.nombre,
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
        //console.log(req.params[0]);
        if(!req.url_vilida){
            throw new pag_not_found('404', 'pag not fuond');
        }
        next();
    },
    print_local: async (nombre, descripcion, cant) => { //
        //console.log(nombre);
        //console.log(descripcion);
        nombre = depurar_dato(nombre);
        descripcion = depurar_dato(descripcion);
        var nombre_archivo = depurar_nombre_archivo(nombre);
    
        
        let dato = '%BTW% /AF=c:\\command\\plantilla_manu.btw /D="%Trigger File Name%" /PRN="EasyCoder PD41 (203 dpi) - IPL" /R=3 /P /DD \n' + 
                    '%END%\n' +
                    'Numero,Descripcion\n' +
                    `${nombre},${descripcion}`
        
        for (let i=0; i < cant; i++){
            await fs.writeFile(`NewInvoice/${nombre_archivo}_${i}.dat`, dato).catch(err=>{
                throw new Custom_error("10", "error archivo", "error al intentar grabar")
            });    
        }
    },
}