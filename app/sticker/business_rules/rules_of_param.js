var models_control = require("../models_control/models_control").controlador_de_sticker;

module.exports = {
    find: function(req,res, next){
        console.log("start")

        let ignore_param = ["_id", "__v"];
        let param = [];

        let data = {};

        if (param.length == 0){
            param = models_control.get_param();
        }

        for (let key of param){
            if(ignore_param.indexOf(key) == -1){
                if (req.query[key]){
                    data[key] = req.query[key];
                }
            }
        }

        req.data = data;

        console.log(data);
        
        next();
    }
}