var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/stiker_0_2")

var sticker_schema = new Schema(
    {
        codigo: {type: String, required: true, maxlength: [50, "muy grande la cadena de texto"]},
        descripcion: {type: String, required: true, maxlength: [50, "muy grande la cadena de texto"]}
    }
);

var Sticker = mongoose.model("Sticker", sticker_schema);

module.exports.Sticker = Sticker;
