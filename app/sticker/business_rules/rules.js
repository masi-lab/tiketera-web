
var models_control = require("../models_control/models_control").controlador_de_sticker;


module.exports = {
    update: async function (req, res){
        nuevo_stricker = new models_control();
        let id_obj = {_id: req.query._id};
        let dic_data_to_change = req.query;
        delete dic_data_to_change["_id"];

        console.log(id_obj);
        console.log(dic_data_to_change);

        let respuesta = await nuevo_stricker.update(id_obj, dic_data_to_change);
        console.log(respuesta);
        res.send("updated");
    },

    save: async function (req, res){
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
    }, 

    find: async function(req, res){
        nuevo_stricker = new models_control();

        let respuesta = await nuevo_stricker.find(req.data);
        //console.log(data);
        res.send(respuesta);
    },

    findOne: async function(req, res){
        nuevo_stricker = new models_control();
        let respuesta = await nuevo_stricker.findOne(JSON.parse(req.query.data));
        console.log(respuesta);
        res.send(respuesta);
    },
    
    print: async function(req, res){
        nuevo_stricker = new models_control();
        let respuesta = await nuevo_stricker.findOne(req.query);
        //console.log(respuesta);

        res.send(respuesta);
    }
}

