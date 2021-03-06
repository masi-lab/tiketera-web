/*
  Esto es la base de datos (modelo, etc)
*/
var Custom_error_with_cut_tag = require("../../../tools/tools").Custom_error_with_cut_tag;
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

var sticker_schema = new Schema(
    {
        codigo: {type: String, default:"", required: true, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, default:"", required: false, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

// Esto es una forma de poner un VALIDADOR CUSTOM

sticker_schema.path('codigo').validate(function(v) {
    if (v.length < 2 ) {
      let trueError = new Custom_error_with_cut_tag("101", "titulo error", "codigo menor a 3 digitos")    
      throw new Error(JSON.stringify(trueError))  
    }
    return true;
})

sticker_schema.plugin(mongoose_delete, { overrideMethods: 'all' });

var Sticker = mongoose.model("Sticker", sticker_schema);

module.exports.Sticker = Sticker;


//---------------------------------------------------------------------------------------------------------------

var sticker_schema_log = new Schema(
    {
        codigo: {type: String, required: false, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, required: false, maxlength: [50, "muy grande la cadena de texto"]},
        fecha: {type: Date, default: Date.now(), required: true},
        cant_impresas: {type: Number, required: false}
    }
);

var Sticker_log = mongoose.model("Sticker_log", sticker_schema_log);

module.exports.Sticker_log = Sticker_log;