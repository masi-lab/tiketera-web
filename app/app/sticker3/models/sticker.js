/*
  Esto es la base de datos (modelo, etc)
*/
var Custom_error_with_cut_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

var sticker3_schema = new Schema(
    {
        descripcion: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

sticker3_schema.plugin(mongoose_delete, { overrideMethods: 'all' });

var Sticker3 = mongoose.model("Sticker3", sticker3_schema);

module.exports.Sticker3 = Sticker3;
