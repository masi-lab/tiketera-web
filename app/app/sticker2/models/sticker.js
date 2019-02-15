/*
  Esto es la base de datos (modelo, etc)
*/
var Custom_error_with_cut_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

var sticker2_schema = new Schema(
    {
        nombre: {type: String, default:"", required: true, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

sticker2_schema.plugin(mongoose_delete, { overrideMethods: 'all' });

var Sticker2 = mongoose.model("Sticker2", sticker2_schema);

module.exports.Sticker2 = Sticker2;
