var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/stiker_0_2", options={useNewUrlParser: true})

var sticker_schema = new Schema(
    {
        codigo: {type: String, required: false, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, required: false, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

var Sticker = mongoose.model("Sticker", sticker_schema);

module.exports.Sticker = Sticker;


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