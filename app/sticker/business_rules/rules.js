
var models_control = require("../models_control/models_control").controlador_de_sticker;


module.exports = {
    update: async function (req, res, next){
        nuevo_stricker = new models_control();
        let id_obj = {_id: req.data._id};
        let dic_data_to_change = req.data;
        delete dic_data_to_change["_id"];

        console.log(id_obj);
        console.log(dic_data_to_change);

        let respuesta = await nuevo_stricker.update(id_obj, dic_data_to_change);
        console.log(respuesta);
        //res.send("updated");
        req.data = respuesta;
        req.status = 200;
        next();
    },

    save: async function (req, res, next){
        sticker = new models_control();
    
        //let dic = {codigo: req.body.codigo, descripcion: req.body.descripcion};
    
        //console.log(req.body);

        try {
            let msg = await sticker.save(req.body);
            //console.log(respuesta);
            res.send(msg);
        } catch (error) {
            //console.log(error);
            res.send(`Error: ${error}`);
        }


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
        //throw Error('Error por que si'); // EXAMPLE OF ERROR
        req.data = respuesta;
        req.status = 200;
        next();
    },

    findOne: async function(req, res, next){
        nuevo_stricker = new models_control();
        console.log(req.data);
        let respuesta = await nuevo_stricker.findOne(req.data);
        console.log(respuesta);
        //res.send(respuesta);
        req.data = respuesta;
        req.status = 200;
        next();
    },
    
    print: async function(req, res, next){
        nuevo_stricker = new models_control();
        let respuesta = await nuevo_stricker.findOne(req.query);
        //console.log(respuesta);

        //res.send(respuesta);
        req.data = respuesta;
        req.status = 200;
        next();
    }
}

