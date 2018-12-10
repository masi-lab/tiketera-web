/*
  Esto es la base de datos (modelo, etc)
*/
var Custom_error = require("../../../tools/tools").custom_error;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true}) // ESTO VA UNA SOLA VEZ

var sticker_schema = new Schema(
    {
        codigo: {type: String, required: true, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, required: false, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

// Esto es una forma de poner un VALIDADOR CUSTOM
sticker_schema.path('codigo').validate(function(v) {
    if (v.length < 4 ) {
      let trueError = new Custom_error("101", "titulo error", "codigo menor a 4 digitos")    
      throw new Error(JSON.stringify(trueError))  
    }
    return true;
  })

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