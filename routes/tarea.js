var tareaModel = require('../models/tarea').TareaModel;
var io;

var jsonCallback = function(res) {
	return function(err, objs) {
		if (err) {
			res.json(err);
		} else {
			res.json(objs);
		}
	};
};

var tareasListado = function(req, res) {
	tareaModel.find(jsonCallback(res));
};

var tarea = function(req, res) {
	tareaModel.findById(req.params.id, jsonCallback(res)); 
};

var exito = function(res, mensaje) {
	return function(err, obj) {
		if (err) {
			res.json(err);
		} else {
			res.json(obj);
			io.sockets.emit(mensaje, obj._id);
		}
	};
};

agregarTarea = function(req, res) {
	var tarea = new tareaModel();
	tarea.descripcion = req.body.descripcion;
	tarea.hecho = req.body.hecho;
	tarea.save(exito(res, "nuevo"));
};

eliminarTarea = function(req, res) {
	tareaModel.findByIdAndRemove(req.params.id, exito(res, "eliminar"));
};

modificarTarea = function(req, res) {
	tareaModel.findById(req.params.id, function(err, tarea) {
		if (err) {
			res.json(err);
		} else {
			tarea.descripcion = req.body.descripcion;
			tarea.hecho = req.body.hecho;
			tarea.save(exito(res, "cambiar"));
		}
	});
};

exports.agregarRutas = function(app, prefix) {
	app.get(prefix, tareasListado);
	app.get(prefix + '/:id', tarea);
	app.post(prefix, agregarTarea);
	app.delete(prefix + '/:id', eliminarTarea);
	app.post(prefix + '/:id', modificarTarea);
};

exports.establecerSocket = function(socket) {
	io = socket;
};
