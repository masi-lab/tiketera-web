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
        var etiqueta = respuesta.etiqueta;
        var numero_serie = respuesta.numero_serie;
        var ubicacion = respuesta.ubicacion;
        var fecha_alta = respuesta.fecha_alta;
        var numero_equipo = respuesta.numero_equipo;
        var ot = respuesta.ot;
        var modelo = respuesta.modelo;
        self.print_local(etiqueta, numero_serie, ubicacion, fecha_alta, numero_equipo, ot, modelo, cant);

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
        self.print_local(req.data.etiqueta, req.data.numero_serie, req.data.ubicacion, req.data.fecha_alta, req.data.numero_equipo, req.data.ot, req.data.modelo, req.data.quantity);

        req.data ={
            "etiqueta": req.data.nombre,
            "numero_serie": req.data.descripcion,
            "ubicacion": req.data.quantity,
            "fecha_alta": req.data.nombre,
            "numero_equipo": req.data.descripcion,
            "ot": req.data.quantity,
            "modelo": req.data.descripcion,
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
    print_local: async (etiqueta, numero_serie, ubicacion, fecha_alta, numero_equipo, ot, modelo,  cant) => { //
        etiqueta = depurar_dato(etiqueta);
        numero_serie = depurar_dato(numero_serie);
        ubicacion = depurar_dato(ubicacion);
        fecha_alta = depurar_dato(fecha_alta);
        numero_equipo = depurar_dato(numero_equipo);
        ot = depurar_dato(ot);
        modelo = depurar_dato(modelo);
        var nombre_archivo = depurar_nombre_archivo(etiqueta);
    
        
        let dato = '%BTW% /AF=c:\\command\\prueba_qr.btw /D="%Trigger File Name%" /PRN="EasyCoder PD41 (203 dpi) - IPL" /R=3 /P /DD \n' + 
                    '%END%\n' +
                    'Dato1,Dato2,Dato3\n' +
                    `${etiqueta},${numero_equipo},{'ubic.': ${ubicacion}// 'eti.': ${etiqueta}// 'alta': ${fecha_alta}// 'serie': ${numero_serie}// 'OT': ${ot}// 'equipo': ${numero_equipo}// 'mod.': ${modelo}}`
        
        for (let i=0; i < cant; i++){
            await fs.writeFile(`NewInvoice/${nombre_archivo}_${i}.dat`, dato).catch(err=>{
                throw new Custom_error("10", "error archivo", "error al intentar grabar")
            });    
        }
    },
}