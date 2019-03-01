/*
  Esto es la base de datos (modelo, etc)
*/
var Custom_error_with_cut_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

var sticker5_schema = new Schema(
    {
        etiqueta: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]},
        numero_serie: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]},
        ubicacion: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]},
        numero_equipo: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]},
        modelo: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]},
    }
);

sticker5_schema.plugin(mongoose_delete, { overrideMethods: 'all' });

var Sticker5 = mongoose.model("Sticker5", sticker5_schema);

module.exports.Sticker5 = Sticker5;
