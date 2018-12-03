var express = require("express");
var Aux = require("../models_control/models_control").controlador_de_sticker;
var router_sticker = express.Router();
var bodyParse = require("body-parser");

router_sticker.use(bodyParse.json());
router_sticker.use(bodyParse.urlencoded({extended: true}));


router_sticker.get("/",async function(req, res){
    //console.log(`PARAM: ${req.query.hola}`);
    nuevo_stricker = new Aux();
    let respuesta = await nuevo_stricker.find(req.query);
    console.log(respuesta);
    res.send("algo");
});

router_sticker.get("/consulta_especifica",async function(req, res){
    nuevo_stricker = new Aux();
    let respuesta = await nuevo_stricker.findOne(req.query);
    console.log(respuesta);
    res.send("algo");
});


router_sticker.post("/save",async function(req, res){
        nuevo_stricker = new Aux();

        let dic = {codigo: req.body.codigo, descripcion: req.body.descripcion};

        try {
            let respuesta = await nuevo_stricker.save(dic);
            //console.log(respuesta);
            res.send("algo salvado");
        } catch (error) {
            //console.log(error);
            res.send("algo NO salvado");      
        }
});


module.exports = router_sticker;