var express = require("express");
var Aux = require("./regla_de_negocio_de_sticker/controlador_de_modelos_de_sticker/controlador_de_sticker").controlador_de_sticker;
var router_sticker = express.Router();
var bodyParse = require("body-parser");

router_sticker.use(bodyParse.json());
router_sticker.use(bodyParse.urlencoded({extended: true}));


router_sticker.get("/",async function(req, res){
    console.log(`PARAM: ${req.query.hola}`);
    nuevo_stricker = new Aux();
    let nose = await nuevo_stricker.find();
    //console.log(nose);
    res.send("algo");
});

router_sticker.get("/consulta_especifica",async function(req, res){
    nuevo_stricker = new Aux();
    let nose = await nuevo_stricker.findOne();
    console.log(nose);
    res.send("algo");
});


router_sticker.get("/save",async function(req, res){
        nuevo_stricker = new Aux();
        
        let dic = {codigo: "codigo5", descripcion: "descripcion5"}; // BORRAR
        //let dic = {codigo: req.body.codigo, descripcion: req.body.descripcion};

        try {
            let nose = await nuevo_stricker.save(dic);
            res.send("algo salvado");
        } catch (error) {
            //console.log(error);
            res.send("algo NO salvado");      
        }
});


module.exports = router_sticker;