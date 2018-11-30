var Sticker = require("./models_de_sticker/sticker").Sticker;

class controlador_de_sticker
{
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

    async find(){
        let resultado = await Sticker.find();
        return resultado;
    }

    findOne(diccionario_datos){

    }

    async save(diccionario_datos){
        console.log("0");
        var sticker = new Sticker(diccionario_datos);
        console.log("1");
        sticker.save().then(
            function(us){
                console.log("1.1");
                console.log(us);
                return "Guardamos los datos";
            },
            function(err){
                if(err){
                    console.log("1.2");
                    console.log(String(err));
                    return ["No pudimos guardar los datos", err];
                }
        });
        console.log("2");
        return "....";
    }
}


/*
.then(
            function(us){
                return "Guardamos los datos";
            },
            function(err){
                if(err){
                    //console.log(String(err));
                    return ["No pudimos guardar los datos", err];
                }
        })


*/

module.exports.controlador_de_sticker = controlador_de_sticker;

/*

var user = new User({email: req.body.email, 
                        password: req.body.password,
                        username: req.body.username})
    /*user.save(function(err){
        res.send("Datos guardados");
    });*//*



*/