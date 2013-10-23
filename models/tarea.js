var mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
	descripcion: {type: String, required: true},
	creado: {type: Date, default: Date.now},
	hecho: {type: Boolean, required: true}
});

exports.TareaModel = mongoose.model('Tarea', TareaSchema);